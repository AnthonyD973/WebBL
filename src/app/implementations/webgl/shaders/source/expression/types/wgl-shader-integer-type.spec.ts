import { WglShaderBooleanType } from './wgl-shader-boolean-type';
import { WglShaderFloatType } from './wgl-shader-float-type';
import { WglShaderIntegerType } from './wgl-shader-integer-type';
import { WglShaderMatrixType } from './wgl-shader-matrix-type';
import { WglShaderVectorType } from './wgl-shader-vector-type';

describe('WglShaderIntegerType', () => {

    let intT: WglShaderIntegerType;

    beforeEach(() => {
        intT = new WglShaderIntegerType();
    });

    it('should be created', () => {
        expect(intT).toBeTruthy();
    });

    describe('parse', () => {
        it('should work correctly', () => {
            expect(intT.parse()).toEqual('int');
        });
    });

});
