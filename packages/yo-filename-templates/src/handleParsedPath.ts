import ejs, { TemplateFunction } from 'ejs';
import { ParsedPath } from 'gulp-rename';
import { normalizePathBrackets } from './brackets';
import { dirname } from 'path';
import { renderEjsPath } from './renderEjsPath';

export default function handleParsedPath(path: ParsedPath, context: Record<string, unknown>): ParsedPath {
    const rendered = renderEjsPath(path, context);
    return rendered;
}
