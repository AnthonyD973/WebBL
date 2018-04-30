import { WglShaderBooleanType } from './wgl-shader-boolean-type';
import { WglShaderFloatType } from './wgl-shader-float-type';
import { WglShaderIntegerType } from './wgl-shader-integer-type';
import { WglShaderMatrixType } from './wgl-shader-matrix-type';
import { WglShaderVectorType } from './wgl-shader-vector-type';

describe('WglShaderFloatType', () => {

    let floatT: WglShaderFloatType;

    beforeEach(() => {
        floatT = new WglShaderFloatType();
    });

    it('should be created', () => {
        expect(floatT).toBeTruthy();
    });

    describe('parse', () => {
        it('should work correctly', () => {
            expect(floatT.parse()).toEqual('float');
        });
    });

});
