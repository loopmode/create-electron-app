import gulpRename, { ParsedPath } from 'gulp-rename';
import { PathTransform, PathVariableTransform, VariableTuple } from '../../types';

/**
 * A stream for replacing variables in filenames.
 * Renames files that have a `key` by replacing that key with a `value`.
 * Each of the `transforms` should be a function that receives a path object and a key/value pair and returns a new path.
 * @param {object} context - An object with key/value pairs of template variables
 * @param {function[]} transforms an array of functions that transform each `path` of the stream
 */
export default function createRenamingStream(context: {}, transforms: PathTransform[]): NodeJS.ReadWriteStream {
    return gulpRename((path: ParsedPath) => {
        applyContextVariablesToPath(path, context, transforms);
    });
}

function applyContextVariablesToPath(path: ParsedPath, context: {}, transforms: PathTransform[]): void {
    const contextEntries: VariableTuple[] = Object.entries(context);
    contextEntries.forEach(contextEntry => {
        Object.assign(
            path,
            transformPath(
                path,
                ...transforms.map((transform: PathTransform): PathVariableTransform => [transform, contextEntry])
            )
        );
    });
}

function transformPath(path: ParsedPath, ...transformations: PathVariableTransform[]): ParsedPath {
    return transformations.reduce((result, [transform, variable]) => {
        return transform(result, variable);
    }, path);
}
