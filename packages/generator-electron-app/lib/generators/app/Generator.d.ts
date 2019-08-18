import Generator, { Question } from 'yeoman-generator';
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
export declare function getQuestions(values?: EWAGeneratorOptions): Question[];
export declare function getAnswers(values: Record<string, any>): EWAGeneratorOptions;
export default class EWAGenerator extends Generator {
    props?: EWAGeneratorOptions;
    constructor(args: string | string[], opts: {});
    prompting(): Promise<void>;
    writing(): void;
    install(): void;
}
//# sourceMappingURL=Generator.d.ts.map