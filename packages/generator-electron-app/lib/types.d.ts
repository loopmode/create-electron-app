import { OptionConfig } from 'yeoman-generator';
import { ParsedPath } from 'gulp-rename';
export declare type VariableTuple = [string, string] | undefined;
export declare type PathTransform = (path: ParsedPath, variable?: VariableTuple, regExp?: RegExp) => ParsedPath;
export declare type PathVariableTransform = [PathTransform, VariableTuple];
export interface RunGeneratorOptions {
    argv?: string[];
}
export interface EWAGeneratorOptions {
    projectName?: string;
    yes?: boolean;
    install?: boolean;
    yarn?: boolean;
    typescript?: boolean;
    eslint?: boolean;
    less?: boolean;
    sass?: boolean;
    ejs?: boolean;
    nunjucks?: boolean;
    webpack?: boolean;
    notifications?: boolean;
    projectNameCC?: string;
}
export interface GeneratorOption extends OptionConfig {
    name: string;
    type: BooleanConstructor | StringConstructor | NumberConstructor | undefined;
}
export interface GeneratorQuestion {
    type: typeof Boolean | typeof String | typeof Number;
}
//# sourceMappingURL=types.d.ts.map