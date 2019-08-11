import path from 'path';
import glob from 'glob';
import Generator, { Question } from 'yeoman-generator';
import camelcase from 'camelcase';
import { getConditionalSyntaxIgnoreGlobs as getConditionalIgnoreGlobs } from '../../utils/conditionalSyntax';
import { getBinaryFiles, getBinaryIgnoreGlobs } from '../../utils/binaryUtils';

const { name, version } = require('../../../package.json');

export interface EWGeneratorOptions {
    projectName?: string;
    projectNameCC?: string;
    yes?: boolean;
    install?: boolean;
    yarn?: boolean;
}

const validators = {
    required(value: string): boolean | string {
        return value ? true : 'This field is required';
    }
};

function initCLIOptions(generator: Generator): void {
    generator.argument('projectName', {
        type: String,
        required: false,
        description: 'Name for the new project'
    });
    generator.option('yes', {
        alias: 'y',
        type: Boolean,
        description: 'Skip questions and use default values'
    });
    generator.option('install', {
        alias: 'i',
        default: true,
        type: Boolean,
        description: 'Install dependencies afterwards'
    });
    generator.option('yarn', {
        default: true,
        type: Boolean,
        description: 'Use yarn instead of npm'
    });
}

/**
 * Adds custom or computed values to those provided by the user
 * @param options given yo questions and answers
 * @return generator options usable by our templates
 */
function addComputedOptions(options: EWGeneratorOptions): EWGeneratorOptions {
    return {
        ...options,
        projectNameCC: camelcase(options.projectName as string)
    };
}

/**
 * Returns the questions for the interactive CLI prompt.
 *
 * @param {object} values - An object with default values
 * @return {object} An array of questions for yeoman's `prompt` method
 */
export function getQuestions(values: EWGeneratorOptions = {}): Question[] {
    return [
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name',
            default: values.projectName,
            validate: validators.required
        }
    ];
}

/**
 * Returns an object with the default values of the questions.
 *
 * Each question is represented as a key/value pair, the key being
 * the "name" of the question, the value being the "default" of the question
 * or the value of a property with the same name provided via `values`.
 *
 * @param {object} values - An object with default values
 * @return {object} An object with a key/value pair for each question
 */
export function getAnswers(values: Record<string, any>): EWGeneratorOptions {
    const questions = getQuestions(values);
    return questions.reduce(
        (result: EWGeneratorOptions, question: Question) => {
            const name = question.name as string;
            return {
                ...result,
                [name]: values[name] || question.default
            };
        },
        {}
    );
}

export default class EWGenerator extends Generator {
    props?: EWGeneratorOptions;

    constructor(args: string | string[], opts: {}) {
        super(args, opts);
        this.log(`${name}@${version} init`);
        this.sourceRoot(path.resolve(__dirname, '../../../templates'));
        initCLIOptions(this);
    }

    async prompting() {
        const options = this.options as EWGeneratorOptions;

        // take whatever CLI args values but add explicit scope and projectName
        const cliValues: EWGeneratorOptions = { ...options };

        // prefill some default values for the questions
        const questionDefaults: EWGeneratorOptions = {
            ...cliValues,
            projectName: options.projectName
        };

        const answerValues: EWGeneratorOptions =
            cliValues.projectName && cliValues.yes
                ? getAnswers(questionDefaults) // either use the default values
                : await this.prompt(getQuestions(questionDefaults)); // or ask the user

        this.props = addComputedOptions(answerValues);
        this.destinationRoot(this.props.projectName);
    }
    writing() {
        const context = this.props as {};

        // template files that are binary throw errors when copied via copyTpl
        // so we exclude them from fs.copyTpl, then manually fs.copy them
        const binaryTemplateFiles = getBinaryFiles(this.templatePath());
        const binaryIgnoreGlobs = getBinaryIgnoreGlobs(binaryTemplateFiles);
        // template files with conditional filename syntax might need to be ignored too
        const conditionalIgnoreGlobs = getConditionalIgnoreGlobs(context);

        this.fs.copyTpl(
            [this.templatePath('**/*'), ...binaryIgnoreGlobs] as any,
            this.destinationPath(),
            context,
            {},
            { globOptions: { dot: true, ignore: conditionalIgnoreGlobs } }
        );

        binaryTemplateFiles.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(file));
        });
    }
    install() {
        const { install, yarn } = this.options as EWGeneratorOptions;
        if (install) {
            if (yarn) {
                this.yarnInstall();
            } else {
                this.npmInstall();
            }
        }
    }
}
