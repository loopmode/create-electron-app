import { renderEjsPath } from '../src/renderEjsPath';
import { ParsedPath } from 'gulp-rename';

describe('renderEjsPath', function() {
    it('noop for regular paths', function() {
        const given: ParsedPath = {
            basename: 'foo-file',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const result = renderEjsPath(given, {});
        expect(result).toEqual(given);
    });
    it('truthy binary boolean in basename', function() {
        const given: ParsedPath = {
            basename: '{%= (foo && "foo-file") %}',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const expected: ParsedPath = {
            basename: 'foo-file',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const result = renderEjsPath(given, { foo: true });
        expect(result).toEqual(expected);
    });
    it('falsy binary boolean in basename', function() {
        const given: ParsedPath = {
            basename: '{%= (foo && "my-file") %}',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const expected: ParsedPath = {
            basename: '',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const result = renderEjsPath(given, { foo: false });
        expect(result).toEqual(expected);
    });

    it('truthy ternary boolean in basename', function() {
        const given: ParsedPath = {
            basename: '{%= (foo ? "foo-file" : "other-file") %}',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const expected: ParsedPath = {
            basename: 'foo-file',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const result = renderEjsPath(given, { foo: true });
        expect(result).toEqual(expected);
    });
    it('falsey ternary boolean in basename', function() {
        const given: ParsedPath = {
            basename: '{%= (foo ? "foo-file" : "other-file") %}',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const expected: ParsedPath = {
            basename: 'other-file',
            extname: 'txt',
            dirname: 'my/dir/name'
        };
        const result = renderEjsPath(given, { foo: undefined });
        expect(result).toEqual(expected);
    });
});
