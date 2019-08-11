import YoEnv from 'yeoman-environment';

export interface RunGeneratorOptions {
    argv?: string[];
    ownArgs?: string[];
}
export default async function run({
    argv = process.argv.slice(),
    ownArgs = ['--force']
}: RunGeneratorOptions = {}) {
    try {
        const args = argv.slice(2).filter(arg => !ownArgs.includes(arg));
        const env = YoEnv.createEnv();
        await runGenerator('@loopmode/electron-app', args, env);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export function runGenerator(
    generatorName: string,
    generatorArgs: string[] = [],
    yoenv: YoEnv
): Promise<Error | null> {
    return new Promise((resolve, reject) => {
        try {
            yoenv.lookup(() =>
                yoenv.run([generatorName, ...generatorArgs], resolve)
            );
        } catch (error) {
            reject(error);
        }
    });
}
