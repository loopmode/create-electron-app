import { EWAGeneratorOptions } from '../types';

import { options as appOptions } from '../generators/app/options';
import Generator, { Question, Answers } from 'yeoman-generator';
import camelcase = require('camelcase');
const validators = {
    required(value: string): boolean | string {
        return value ? true : 'This field is required';
    }
};

export function initOptions(generator: Generator) {
    appOptions.forEach(({ name, description, ...option }) => {
        if (description && description.endsWith('?')) {
            description = description.substr(0, description.length - 1);
        }
        generator.option(name, { description, ...option });
    });
}

function getQuestions(values: EWAGeneratorOptions): Question[] {
    const typeMap: Record<string, string> = {
        Boolean: 'confirm'
    };
    return [
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name',
            default: values.projectName,
            validate: validators.required
        },
        ...appOptions
            .filter(option => !option.internal)
            .map(option => {
                return {
                    name: option.name,
                    type: (option.type && typeMap[option.type.name]) || 'input',
                    default: (values as Record<string, any>)[option.name],
                    message: option.description
                } as Question;
            })
    ];
}

/**
 * Adds custom or computed values to those provided by the user
 * @param options given yo questions and answers
 * @return generator options usable by our templates
 */
export function addComputedOptions(options: EWAGeneratorOptions): EWAGeneratorOptions {
    return {
        ...options,
        projectNameCC: camelcase(options.projectName as string)
    };
}

const defaultInternalOptions: EWAGeneratorOptions = {
    electronWebpackConfig: false,
    defaultRendererTemplate: true
};

export async function getAnswers(
    generator: Generator,
    cliValues: EWAGeneratorOptions,
    defaults: EWAGeneratorOptions
): Promise<EWAGeneratorOptions> {
    const result: EWAGeneratorOptions = {
        ...defaultInternalOptions,
        projectName: cliValues.projectName
    };

    function getDefaultAnswers(): Answers {
        return questions.reduce((result, question) => {
            const name = question.name as string;
            const value = (defaults as any)[name] || question.default;
            if (value === undefined) {
                return result;
            }
            return {
                ...result,
                [name]: value
            };
        }, {});
    }

    // attention: questions array gets mutated later on
    // (we splice some questions out of it)
    const questions = getQuestions(defaults);

    if (cliValues.projectName && cliValues.yes) {
        // earliest exit: projectName is given, yes is specified; use defaults
        return Object.assign(result, getDefaultAnswers());
    }

    {
        const nameQuestion = questions.find(question => question.name === 'projectName');
        if (nameQuestion) {
            // pluck projectName from array so user won't have to answer again later
            questions.splice(questions.indexOf(nameQuestion), 1);
        }

        if (nameQuestion && !result.projectName) {
            // promt for projectName if it was not specified via CLI already
            const answers = await generator.prompt(nameQuestion);
            result.projectName = answers.projectName;
        }
    }

    {
        const yesQuestion = questions.find(question => question.name === 'yes');
        if (yesQuestion) {
            // pluck yes from array so user won't have to answer again later
            questions.splice(questions.indexOf(yesQuestion), 1);
            // however, ask the user whether he wants to skip questions and use defaults
            const answers = await generator.prompt({ ...yesQuestion, default: true });
            if (answers.yes) {
                return Object.assign(result, getDefaultAnswers());
            }
        }
    }

    // user chose to answer all (remaining) questions manually

    const notInternal = (question: Question): boolean => {
        const option = appOptions.find(o => o.name === question.name);
        return !(option && option.internal);
    };

    const userAnswers = await generator.prompt(questions.filter(notInternal));
    return Object.assign(result, userAnswers);
}

export function applyImplicitOptions(options: EWAGeneratorOptions): EWAGeneratorOptions {
    if (options.react) {
        if (!options.webpack) logImplicitOverrides({ react: { webpack: true } });
        options.webpack = true;
        options.defaultRendererTemplate = false;
    }
    if (options.webpack) {
        options.electronWebpackConfig = true;
    }

    return options;
}

function logImplicitOverrides(dependencies: Record<string, Record<string, unknown>>): void {
    console.log('');
    console.info('Overriding user choices:');
    Object.entries(dependencies).forEach(([reason, overrides]) => {
        console.info(`  - ${reason} requires`);
        Object.entries(overrides).forEach(([override, value]) => {
            console.info(`      - ${override}=${value}`);
        });
    });
    console.log('');
}
