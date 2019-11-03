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
}
export interface EWAGeneratorOptions {
    projectName?: string;
    yes?: boolean;
    install?: boolean;
    yarn?: boolean;
    // pre-processors
    typescript?: boolean;
    eslint?: boolean;
    prettier?: boolean;
    less?: boolean;
    sass?: boolean;
    // frameworks
    react?: boolean;
    vue?: boolean;
    // templates
    ejs?: boolean;
    nunjucks?: boolean;
    // misc
    webpack?: boolean;
    notifications?: boolean;
    // computed values
    projectNameCC?: string;
    // internal values
    electronWebpackConfig?: boolean;
    defaultRendererTemplate?: boolean;
}

export interface GeneratorOption extends OptionConfig {
    internal?: boolean;
    name: string;
    type: BooleanConstructor | StringConstructor | NumberConstructor | undefined;
}

export interface GeneratorQuestion {
    type: typeof Boolean | typeof String | typeof Number;
}
