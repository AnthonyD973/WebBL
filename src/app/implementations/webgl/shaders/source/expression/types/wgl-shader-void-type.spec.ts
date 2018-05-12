import { WglShaderVoidType } from './wgl-shader-void-type';
import { WglShaderFloatType } from './wgl-shader-float-type';
import { WglShaderIntegerType } from './wgl-shader-integer-type';
import { WglShaderMatrixType } from './wgl-shader-matrix-type';
import { WglShaderVectorType } from './wgl-shader-vector-type';

describe(WglShaderVoidType.name, () => {

    let voidT: WglShaderVoidType;

    beforeEach(() => {
        voidT = new WglShaderVoidType();
    });

    it('should be created', () => {
        expect(voidT).toBeTruthy();
    });

    describe('parse', () => {
        it('should work correctly', () => {
            expect(voidT.parse()).toEqual('void');
        });
    });

});
