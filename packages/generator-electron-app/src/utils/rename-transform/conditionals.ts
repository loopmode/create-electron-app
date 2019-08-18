import { ParsedPath } from 'gulp-rename';
import { VariableTuple } from '../../types';

import { DEFAULT_CONDITIONAL_SYNTAX_REGEXP, Delimiters } from '../conditionalSyntax';

/**
 * Removes conditional syntax from the values of a `path` object.
 *
 * @param path A gulp-rename path object
 * @param variable A `key,value` tuple of a context variable
 * @param regExp A regular expression for detecting conditional syntax in filenames
 */
export default function normalizeConditionals(
    path: ParsedPath,
    variable: VariableTuple,
    regExp: RegExp = DEFAULT_CONDITIONAL_SYNTAX_REGEXP
): ParsedPath {
    if (!variable) return path;
    const [key, value] = variable;
    const result = {
        dirname: normalizeString(path.dirname, [key, value], regExp),
        basename: normalizeString(path.basename, [key, value], regExp),
        extname: normalizeString(path.extname, [key, value], regExp)
    };
    return result;
}

function normalizeString(inputString: string | undefined, variable: VariableTuple, regExp: RegExp): string | undefined {
    if (!inputString || inputString === '.' || !variable) {
        return inputString;
    }

    const matches = inputString.match(regExp);
    if (!matches) {
        return inputString;
    }

    // the current variable
    const [key, value] = variable;

    // the groups from the regular expression
    const [, path, varname, , filename] = matches;

    // not our current variable name, ignore
    if (varname !== key && varname !== `!${key}`) {
        return inputString;
    }

    if (
        // "%typescript && tsconfig.json"
        (varname === key && value) ||
        // "%!typescript && jsconfig.json"
        (varname === `!${key}` && !value)
    ) {
        return `${path}${filename}`;
    }

    // "index.%typescript #& ts ## js"
    if (varname === key && filename.includes(Delimiters.TERNARY_OR)) {
        const ternaryResult = filename.split(Delimiters.TERNARY_OR)[value ? 0 : 1];
        return `${path}${ternaryResult}`;
    }

    return inputString;
}
