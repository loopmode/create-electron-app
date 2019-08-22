import ejs from 'ejs';
import { ParsedPath } from 'gulp-rename';
import { normalizePathBrackets } from './brackets';

/**
 * Takes a `ParsedPath` and renders each of its properties as an EJS fs template
 * @param path
 * @param context
 * @param options
 */
export function renderEjsPath(
    path: ParsedPath,
    context: Record<string, unknown>,
    options: Record<string, unknown> = {}
): ParsedPath {
    const maybe = (value: string): string => (value === 'false' ? '' : value);
    const normalized = normalizePathBrackets(path);
    const rendered = {
        dirname: ejs.render(normalized.dirname || '', context, options),
        basename: ejs.render(normalized.basename || '', context, options),
        extname: ejs.render(normalized.extname || '', context, options)
    };
    return {
        dirname: maybe(rendered.dirname),
        basename: maybe(rendered.basename),
        extname: maybe(rendered.extname)
    };
}
