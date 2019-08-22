import { ParsedPath } from 'gulp-rename';

export const EJS_OPENING_BRACKET = '<%';
export const EJS_CLOSING_BRACKET = '%>';
export const FS_OPENING_BRACKET = '{%';
export const FS_CLOSING_BRACKET = '%}';

export const replacementMap = {
    [EJS_OPENING_BRACKET]: new RegExp(FS_OPENING_BRACKET, 'g'),
    [EJS_CLOSING_BRACKET]: new RegExp(FS_CLOSING_BRACKET, 'g')
};

/**
 * Replaces the bracketStrings used in filesystemm templates with the ones used in EJS templates
 * @param value
 */
export function normalizeBrackets(value: string): string {
    return Object.entries(replacementMap).reduce(
        (result, [replacement, occurence]) => result.replace(occurence, replacement),
        value
    );
}

/**
 * Returns a new ParsedPath with brackets normalized in all its values
 */
export function normalizePathBrackets(path: ParsedPath): ParsedPath {
    return {
        basename: normalizeBrackets(path.basename || ''),
        dirname: normalizeBrackets(path.dirname || ''),
        extname: normalizeBrackets(path.extname || '')
    };
}
