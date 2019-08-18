import { ParsedPath } from 'gulp-rename';
export declare type VariableTuple = [string, string] | undefined;
export declare type PathTransform = (path: ParsedPath, variable?: VariableTuple, regExp?: RegExp) => ParsedPath;
export declare type PathVariableTransform = [PathTransform, VariableTuple];
//# sourceMappingURL=types.d.ts.map