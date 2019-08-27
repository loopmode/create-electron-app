import path from 'path';

import Generator from 'yeoman-generator';

import { EWAGeneratorOptions } from '../../types';
import { getBinaryFiles, getBinaryIgnoreGlobs } from '../../utils/binaryUtils';
import { getConditionalSyntaxIgnoreGlobs as getConditionalIgnoreGlobs } from '../../utils/conditionalSyntax';
import { initOptions, addComputedOptions, getAnswers, applyImplicitOptions } from '../../utils/questionsUtils';

import { createTransformStream, createIgnoreGlobs } from '@loopmode/yo-transform-filenames';
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

        this.registerTransformStream(createTransformStream(context));

        // template files that are binary throw errors when copied via copyTpl
        // so we exclude them from fs.copyTpl and manually fs.copy them instead
        const binaryTemplateFiles = getBinaryFiles(this.templatePath());
        binaryTemplateFiles.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(file));
        });

        this.fs.copyTpl(
            [this.templatePath('**/*'), ...getBinaryIgnoreGlobs(binaryTemplateFiles)] as any,
            this.destinationPath(),
            context,
            {},
            {
                globOptions: {
                    dot: true,
                    ignore: await createIgnoreGlobs(this.templatePath(), context)
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
}
