export enum Delimiters {
    // brackets
    OPENING_BRACKET_EJS = '<%',
    OPENING_BRACKET_FS = '{%',
    CLOSING_BRACKET_EJS = '%>',
    CLOSING_BRACKET_FS = '%}',
    CLOSING_BRACKET_EJS_NEWLINE_SLURP = '-%>',
    CLOSING_BRACKET_EJS_WHITESPACE_SLURP = '_%>',
    // binary conditions
    BINARY_AND_OPERATOR_EJS = '&&',
    BINARY_AND_OPERATOR_FS = '#++',
    BINARY_OR_OPERATOR_EJS = '||',
    BINARY_OR_OPERATOR_FS = '#--',
    // ternary conditions
    TERNARY_AND_OPERATOR_EJS = '?',
    TERNARY_AND_OPERATOR_FS = '#+',
    TERNARY_OR_OPERATOR_EJS = ':',
    TERNARY_OR_OPERATOR_FS = '#-'
}