import { OptionConfig } from 'yeoman-generator';
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
    typescript?: boolean;
    eslint?: boolean;
    less?: boolean;
    sass?: boolean;
    ejs?: boolean;
    nunjucks?: boolean;
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
//# sourceMappingURL=types.d.ts.map