import glob from 'glob';
import { renderPath } from './renderPath';

export async function createIgnoreGlobs(dir: string, context: {}, globOptions?: {}): Promise<string[] | Error> {
    const candidates = glob.sync('**/*{%*', { dot: true, cwd: dir, ...globOptions });
    return candidates.reduce((result: string[], candidate) => {
        const rendered = renderPath(candidate, context);
        if (rendered.ignore) {
            const safeGlob = candidate.replace(/'/g, '*');
            result.push(`**/*${safeGlob}*`, `**/*${safeGlob}*/*`);
        }
        return result;
    }, []);
}
