import ejs from 'ejs';
import Path from 'path';

import { ParsedPath } from 'gulp-rename';
import { normalizeSyntax } from './normalize';

export interface RenderedPath extends ParsedPath {
    ignore: boolean;
}

/**
 * Takes a `ParsedPath` object and renders each of its values using the EJS templating engine
 * In case a value resolved falsy, it will be replaced by an empty string.
 *
 * @param path - The `{dirname, basename, extname}` object representing a file
 * @param context - An object with key/value pairs of template variables to use
 * @param options - EJS rendering options
 */
export function renderPath(
    candidate: string,
    context: Record<string, unknown>,
    options: Record<string, unknown> = {}
): RenderedPath {
    const original = parsePath(candidate);
    const rendered = ejs.render(normalizeSyntax(candidate), context, options);
    const parsed = parsePath(rendered);
    const ignore = isFalsy(parsed.dirname) || isFalsy(parsed.basename);

    return Object.assign({ ignore }, ignore ? original : parsed);
}

const falsyValues = ['false', 'undefined', 'null', '0'];

export function isFalsy(value?: string): boolean {
    return value ? falsyValues.some(falsyValue => value.endsWith(falsyValue)) : false;
}

// copied internal function from gulp-rename
export function parsePath(path: string): ParsedPath {
    const extname = Path.extname(path);
    const dirname = Path.dirname(path);
    const basename = Path.basename(path, extname);

    return {
        dirname,
        basename,
        extname
    };
}
