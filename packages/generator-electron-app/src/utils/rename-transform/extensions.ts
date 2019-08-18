import { ParsedPath } from 'gulp-rename';

const TRAILING_DELIMITER = '%';

/**
 * Removes trailing % from filename extensions
 */
export default function fixExtension(path: ParsedPath): ParsedPath {
    if (path.extname) {
        // regular files have an extname that we should fix
        return {
            ...path,
            extname: removeSuffix(path.extname, TRAILING_DELIMITER)
        };
    }

    // resource files like .gitignore need special handling
    // instead of having an extname but no basename, it's the other way around in yeoman
    // and they have a basename but no extname. The basename is the entire name, so we fix it
    return {
        ...path,
        basename: removeSuffix(path.basename, TRAILING_DELIMITER)
    };
}

function removeSuffix(value: string | undefined, suffix: string): string | undefined {
    if (value && value.endsWith(suffix)) {
        return value.slice(0, -1);
    }
    return value;
}
