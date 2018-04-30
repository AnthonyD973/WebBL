import { TestBed, inject } from '@angular/core/testing';
import { WglShaderVariable } from './wgl-shader-variable';
import { WglShaderTestingExpressionType } from '../../../testing/wgl-shader-testing-expression-type';
import { WglShaderIntegerLiteral } from '../rvalues/wgl-shader-integer-literal';

describe('WglShaderVariable', () => {

    beforeEach(() => TestBed.configureTestingModule({
    }));

    let type1: WglShaderTestingExpressionType;
    let var1: WglShaderVariable;

    beforeEach(() => {
        type1 = new WglShaderTestingExpressionType(true, 'TestType');
        var1 = new WglShaderVariable('myVar', type1);
    });

    it('should be created', () => {
        expect(var1).toBeTruthy();
        expect(() => new WglShaderVariable('_myVar', type1)).toBeTruthy();
        expect(() => new WglShaderVariable('MYVAR', type1)).toBeTruthy();
        expect(() => new WglShaderVariable('_', type1)).toBeTruthy();
        expect(() => new WglShaderVariable('_8', type1)).toBeTruthy();
        expect(() => new WglShaderVariable('myVar3_', type1)).toBeTruthy();
    });

    it('should not be created when its name is null or invalid', () => {
        expect(() => new WglShaderVariable(null, type1)).toThrow();
        expect(() => new WglShaderVariable('', type1)).toThrow();
        expect(() => new WglShaderVariable('0myVar', type1)).toThrow();
        expect(() => new WglShaderVariable('my*var', type1)).toThrow();
    });

    describe('parse', () => {
        it('should parse a variable declaration', () => {
            expect(var1.parse()).toMatch(/\s*TestType\smyVar;/);
        });
    });

});
