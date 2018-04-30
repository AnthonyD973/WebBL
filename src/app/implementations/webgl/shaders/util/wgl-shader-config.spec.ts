import { WglShaderConfig as Cfg } from './wgl-shader-config';

describe('WglShaderConfig', () => {

    describe('IDENTIFIER_REGEX', () => {

        it('should match valid WebGL identifiers', () => {
            expect(Cfg.IDENTIFIER_REGEX.test('a')).toBe(true);
            expect(Cfg.IDENTIFIER_REGEX.test('A')).toBe(true);
            expect(Cfg.IDENTIFIER_REGEX.test('abcdefghijklmnopqrstuvwxyza')).toBe(true);
            expect(Cfg.IDENTIFIER_REGEX.test('_')).toBe(true);
            expect(Cfg.IDENTIFIER_REGEX.test('_8')).toBe(true);
            expect(Cfg.IDENTIFIER_REGEX.test('a_')).toBe(true);
        });

        it('should not match invalid WebGL indentifiers', () => {
            expect(Cfg.IDENTIFIER_REGEX.test('')).toBe(false);
            expect(Cfg.IDENTIFIER_REGEX.test('8_')).toBe(false);
            expect(Cfg.IDENTIFIER_REGEX.test('8a')).toBe(false);
            expect(Cfg.IDENTIFIER_REGEX.test('â')).toBe(false);
        });

    });

});
