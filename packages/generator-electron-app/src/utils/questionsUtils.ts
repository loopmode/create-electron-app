import { EWAGeneratorOptions } from '../types';

import { options } from '../generators/app/options';
import Generator, { Question } from 'yeoman-generator';
import camelcase = require('camelcase');

const validators = {
    required(value: string): boolean | string {
        return value ? true : 'This field is required';
    }
};

export function initOptions(generator: Generator) {
    options.forEach(({ name, ...option }) => generator.option(name, option));
}

export function getQuestions(values: EWAGeneratorOptions): Question[] {
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
        ...options.map(option => {
            return {
                name: option.name,
                type: (option.type && typeMap[option.type.name]) || 'input',
                default: (values as Record<string, any>)[option.name],
                message: option.description
            } as Question;
        })
    ];
}

export function getAnswers(options: EWAGeneratorOptions): EWAGeneratorOptions {
    const values = options as Record<string, string>;
    return getQuestions(values).reduce((result, question) => {
        const name = question.name as string;
        return {
            ...result,
            [name]: values[name] || question.default
        };
    }, {}) as EWAGeneratorOptions;
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
