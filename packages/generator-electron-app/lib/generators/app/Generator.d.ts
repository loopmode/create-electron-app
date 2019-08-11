import Generator, { Question } from 'yeoman-generator';
export interface EWGeneratorOptions {
    projectName?: string;
    projectNameCC?: string;
    yes?: boolean;
    install?: boolean;
    yarn?: boolean;
}
export declare function getQuestions(values?: EWGeneratorOptions): Question[];
export declare function getAnswers(values: Record<string, any>): EWGeneratorOptions;
export default class EWGenerator extends Generator {
    props?: EWGeneratorOptions;
    constructor(args: string | string[], opts: {});
    prompting(): Promise<void>;
    writing(): void;
    install(): void;
}
//# sourceMappingURL=Generator.d.ts.map