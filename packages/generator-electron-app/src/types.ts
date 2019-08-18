import { OptionConfig } from 'yeoman-generator';
import { ParsedPath } from 'gulp-rename';

/**
 * A key/value pairs in form of an entry array
 */
export type VariableTuple = [string, string] | undefined;

/**
 * A function that takes a path and returns a path
 */
export type PathTransform = (path: ParsedPath, variable?: VariableTuple, regExp?: RegExp) => ParsedPath;

/**
 * A tuple of a given transform function and a context variable key/value for the transformation.
 */
export type PathVariableTransform = [PathTransform, VariableTuple];

export interface RunGeneratorOptions {
    argv?: string[];
    ownArgs?: string[];
}
export interface EWAGeneratorOptions {
    projectName?: string;
    projectNameCC?: string;
    yes?: boolean;
    install?: boolean;
    yarn?: boolean;
    // pre-processors
    typescript?: boolean;
    eslint?: boolean;
    less?: boolean;
    sass?: boolean;
    // templates
    ejs?: boolean;
    nunjucks?: boolean;
    // misc
    webpack?: boolean;
    notifications?: boolean;
}

export interface GeneratorOption extends OptionConfig {
    name: string;
    type: BooleanConstructor | StringConstructor | NumberConstructor | undefined;
}

export interface GeneratorQuestion {
    type: typeof Boolean | typeof String | typeof Number;
}
