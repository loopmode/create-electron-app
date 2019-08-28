import path from 'path';
import fs from 'fs-extra';

import Generator from 'yeoman-generator';
import yosay from 'yosay';

import { EWAGeneratorOptions } from '../../types';
import { getBinaryFiles, getBinaryIgnoreGlobs } from '../../utils/binaryUtils';
import { initOptions, addComputedOptions, getAnswers, applyImplicitOptions } from '../../utils/questionsUtils';

import { createTransformStream, createIgnoreGlobs, getFilePath, renderPath } from '@loopmode/yo-transform-filenames';
const { name, version } = require('../../../package.json');

export default class EWAGenerator extends Generator {
    props?: EWAGeneratorOptions;

    constructor(args: string | string[], opts: {}) {
        super(args, opts);
        this.log(`${name}@${version} init`);
        this.sourceRoot(path.resolve(__dirname, '../../../templates'));

        this.argument('projectName', {
            type: String,
            required: false,
            description: 'Name for the new project'
        });
        initOptions(this);
    }

    async prompting() {
        const options = this.options as EWAGeneratorOptions;

        // take whatever CLI args values but add explicit scope and projectName
        const cliValues: EWAGeneratorOptions = { ...options };

        // prefill some default values for the questions
        const questionDefaults: EWAGeneratorOptions = {
            ...cliValues,
            projectName: options.projectName
        };

        let userOptions: EWAGeneratorOptions = await getAnswers(this, cliValues, questionDefaults);
        userOptions = applyImplicitOptions(userOptions);

        this.props = addComputedOptions(userOptions);
        this.destinationRoot(this.props.projectName);
    }
    async writing() {
        const context = this.props as {};

        //--------------------------------------------------------------------
        // FILENAME TEMPLATE SYNTAX
        // - render EJS syntax in filenames using a transform stream
        // - create array of skipped files that have falsy conditional names
        //--------------------------------------------------------------------
        this.registerTransformStream(createTransformStream(context));
        const ignoredConditionalFiles = (await createIgnoreGlobs(this.templatePath(), context)) as Set<string>;

        //--------------------------------------------------------------------
        // BINARY TEMPLATE FILES
        // template files that are binary throw errors when copied via copyTpl
        // we exclude them from fs.copyTpl and manually copy them instead
        //--------------------------------------------------------------------
        const binaryTemplateFiles = getBinaryFiles(this.templatePath(), ignoredConditionalFiles);
        binaryTemplateFiles.forEach((file: string) => {
            const rendered = renderPath(this.destinationPath(file), context);
            const src = this.templatePath(file);
            const dest = getFilePath(rendered);

            fs.ensureDirSync(path.dirname(dest));
            fs.copyFileSync(src, dest);
        });
        const ignoredBinaryFiles = getBinaryIgnoreGlobs(binaryTemplateFiles);

        //--------------------------------------------------------------------
        // COPY REGULAR TEMPLATE FILES
        //--------------------------------------------------------------------
        this.fs.copyTpl(
            [this.templatePath('**/*')] as any,
            this.destinationPath(),
            context,
            {},
            {
                globOptions: {
                    dot: true,
                    ignore: [...ignoredBinaryFiles, ...ignoredConditionalFiles]
                }
            }
        );
    }

    install() {
        const { install, yarn } = this.options as EWAGeneratorOptions;
        if (install) {
            if (yarn) {
                this.yarnInstall();
            } else {
                this.npmInstall();
            }
        }
    }

    end() {
        const props = this.props || {};
        this.log(yosay(`All right - project created!\nTry it out:\n\ncd ${props.projectName}\nyarn dev`));
    }
}
