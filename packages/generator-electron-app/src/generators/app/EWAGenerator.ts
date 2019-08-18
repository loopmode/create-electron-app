import path from 'path';

import Generator from 'yeoman-generator';

import { EWAGeneratorOptions } from '../../types';
import { getBinaryFiles, getBinaryIgnoreGlobs } from '../../utils/binaryUtils';
import { getConditionalSyntaxIgnoreGlobs as getConditionalIgnoreGlobs } from '../../utils/conditionalSyntax';
import { initOptions, getQuestions, getAnswers, addComputedOptions } from '../../utils/questionsUtils';
import * as renameTransform from '../../utils/rename-transform';

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

        const answerValues: EWAGeneratorOptions =
            cliValues.projectName && cliValues.yes
                ? getAnswers(questionDefaults) // either use the default values
                : await this.prompt(getQuestions(questionDefaults)); // or ask the user

        this.props = addComputedOptions(answerValues);
        this.destinationRoot(this.props.projectName);
    }
    writing() {
        const context = this.props as {};

        // register a stream that will rename files and folders
        // that have our conditional syntax in their names
        this.registerTransformStream(
            renameTransform.createTransformStream(context, [
                renameTransform.extensions,
                renameTransform.variables,
                renameTransform.conditionals
            ])
        );

        // template files that are binary throw errors when copied via copyTpl
        // so we exclude them from fs.copyTpl, then manually fs.copy them
        const binaryTemplateFiles = getBinaryFiles(this.templatePath());
        const binaryIgnoreGlobs = getBinaryIgnoreGlobs(binaryTemplateFiles);
        // template files with conditional filename syntax might need to be ignored too
        // (when the condition in their name doesn't match the given options)
        const conditionalIgnoreGlobs = getConditionalIgnoreGlobs(context);

        // first copy the template files
        this.fs.copyTpl(
            [this.templatePath('**/*'), ...binaryIgnoreGlobs] as any,
            this.destinationPath(),
            context,
            {},
            { globOptions: { dot: true, ignore: conditionalIgnoreGlobs } }
        );

        // finally copy the skipped binary files
        binaryTemplateFiles.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(file));
        });
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
