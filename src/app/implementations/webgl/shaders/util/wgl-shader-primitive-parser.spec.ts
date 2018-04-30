import { WglShaderPrimitiveParser as PParser } from './wgl-shader-primitive-parser';

describe('WglShaderPrimitiveParser', () => {

    it('should parse boolean values', () => {
        expect(PParser.parseBoolean(true)).toEqual('true');
        expect(PParser.parseBoolean(false)).toEqual('false');
    });

    it('should parse float values', () => {
        expect(PParser.parseFloat(0)).toMatch(/^0\.0?$/);
        expect(PParser.parseFloat(-3.14)).toMatch(/^-3\.14$/);
    });

    it('should parse integer values', () => {
        expect(PParser.parseInteger(0)).toEqual('0');
        expect(PParser.parseInteger(3.14)).toEqual('3');
        expect(PParser.parseInteger(-3.14)).toEqual('-4');
    });

});
