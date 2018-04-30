import { WglShaderBooleanType } from './wgl-shader-boolean-type';
import { WglShaderFloatType } from './wgl-shader-float-type';
import { WglShaderIntegerType } from './wgl-shader-integer-type';
import { WglShaderMatrixType } from './wgl-shader-matrix-type';
import { WglShaderVectorType } from './wgl-shader-vector-type';

describe('WglShaderVectorType', () => {

    let vec4T: WglShaderVectorType;
    let vec2T: WglShaderVectorType;

    beforeEach(() => {
        vec4T = new WglShaderVectorType(4);
        vec2T = new WglShaderVectorType(2);
    });

    it('should be created when the dimensions are accaptable', () => {
        expect(vec4T).toBeTruthy();
        expect(vec2T).toBeTruthy();
    });

    it('should not be created when the dimensions are not accaptable', () => {
        expect(() => new WglShaderVectorType(-1)).toThrow();
        expect(() => new WglShaderVectorType( 0)).toThrow();
        expect(() => new WglShaderVectorType( 1)).toThrow();
        expect(() => new WglShaderVectorType( 5)).toThrow();
        expect(() => new WglShaderVectorType( 6)).toThrow();
    });

    describe('parse', () => {
        it('should work correctly', () => {
            expect(vec4T.parse()).toEqual('vec4');
            expect(vec2T.parse()).toEqual('vec2');
        });
    });

});
