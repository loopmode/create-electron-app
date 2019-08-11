import YoEnv from 'yeoman-environment';
export interface RunGeneratorOptions {
    argv?: string[];
    ownArgs?: string[];
}
export default function run({ argv, ownArgs }?: RunGeneratorOptions): Promise<void>;
export declare function runGenerator(generatorName: string, generatorArgs: string[] | undefined, yoenv: YoEnv): Promise<Error | null>;
//# sourceMappingURL=run.d.ts.map