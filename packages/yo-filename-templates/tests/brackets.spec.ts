import { normalizeBrackets, normalizePathBrackets } from '../src/brackets';
import { ParsedPath } from 'gulp-rename';

describe('normalizeBrackets', function() {
    it('noop for regular string', function() {
        const value: string = 'this is my foo';
        const result = normalizeBrackets(value);
        expect(result).toEqual(value);
    });
    it('replaces opening brackets', function() {
        const given: string = 'this {% is my {% foo';
        const expected: string = 'this <% is my <% foo';
        const result = normalizeBrackets(given);
        expect(result).toEqual(expected);
    });
    it('replaces closing brackets', function() {
        const given: string = 'this %} is my %} foo';
        const expected: string = 'this %> is my %> foo';
        const result = normalizeBrackets(given);
        expect(result).toEqual(expected);
    });
});

describe('normalizePathBrackets', function() {
    it('noop for regular paths', function() {
        const value: ParsedPath = {
            dirname: 'foo',
            basename: 'foo',
            extname: 'foo'
        };
        const result = normalizePathBrackets(value);
        expect(result).toEqual(value);
    });
    it('replaces brackets', function() {
        const value: ParsedPath = {
            dirname: '{% foo %}',
            basename: '{% foo %}',
            extname: '{% foo %}'
        };
        const expected: ParsedPath = {
            dirname: '<% foo %>',
            basename: '<% foo %>',
            extname: '<% foo %>'
        };
        const result = normalizePathBrackets(value);
        expect(result).toEqual(expected);
    });
});
