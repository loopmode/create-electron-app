import gulpRename, { ParsedPath } from 'gulp-rename';
import { PathTransform, PathVariableTransform, VariableTuple } from '../../types';

/**
 * Creates a stream for processing template syntax in file and folder names.
 * @param {object} context - An object with key/value pairs of template variables
 */
export default function createRenamingStream(context: {}, transforms: PathTransform[]): NodeJS.ReadWriteStream {
    return gulpRename((path: ParsedPath) => {
        processParsedPath(path, context, transforms);
    });
}

function processParsedPath(path: ParsedPath, context: {}, transforms: PathTransform[]): void {
    // const contextEntries: VariableTuple[] = Object.entries(context);
    // contextEntries.forEach(contextEntry => {
    //     Object.assign(
    //         path,
    //         transformPath(
    //             path,
    //             ...transforms.map((transform: PathTransform): PathVariableTransform => [transform, contextEntry])
    //         )
    //     );
    // });
}

// function transformPath(path: ParsedPath, ...transformations: PathVariableTransform[]): ParsedPath {
//     return transformations.reduce((result, [transform, variable]) => {
//         return transform(result, variable);
//     }, path);
// }
