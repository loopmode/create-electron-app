import { ParsedPath } from 'gulp-rename';
import { VariableTuple } from '../../types';

// replaces a %variable% by its value in a string
export default function injectVariable(path: ParsedPath, variable: VariableTuple): ParsedPath {
    if (!variable) return path;
    const [key, value] = variable;
    return {
        dirname: inject(path.dirname, [key, value]),
        basename: inject(path.basename, [key, value]),
        extname: inject(path.extname, [key, value])
    };
}

function inject(str: string | undefined, variable: VariableTuple): string | undefined {
    if (!variable || !str) return str;
    const [key, value] = variable;
    const regExp = new RegExp(`%(${key})%`);
    if (str.match(regExp)) {
        str = str.replace(regExp, value);
    }
    return str;
}
