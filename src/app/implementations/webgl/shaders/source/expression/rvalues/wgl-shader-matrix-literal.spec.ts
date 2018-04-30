import { WglShaderMatrixLiteral } from './wgl-shader-matrix-literal';
import { WglShaderMatrixType } from '../types/wgl-shader-matrix-type';
import { WglShaderFloatType } from '../types/wgl-shader-float-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';

describe(WglShaderMatrixLiteral.name, () => {

    let mat2: WglShaderMatrixLiteral;
    let mat23: WglShaderMatrixLiteral;
    let mat3: WglShaderMatrixLiteral;
    let mat32: WglShaderMatrixLiteral;
    let mat4: WglShaderMatrixLiteral;

    beforeEach(() => {
        mat2  = new WglShaderMatrixLiteral(2, 2);
        mat23 = new WglShaderMatrixLiteral(2, 3);
        mat3  = new WglShaderMatrixLiteral(3, 3);
        mat32 = new WglShaderMatrixLiteral(3, 2);
        mat4  = new WglShaderMatrixLiteral(4, 4);
    });

    it('should be created', () => {
        expect(mat2).toBeTruthy();
        expect(mat2.type).toEqual(new WglShaderMatrixType(2, 2));

        expect(mat23).toBeTruthy();
        expect(mat23.type).toEqual(new WglShaderMatrixType(2, 3));

        expect(mat3).toBeTruthy();
        expect(mat3.type).toEqual(new WglShaderMatrixType(3, 3));

        expect(mat32).toBeTruthy();
        expect(mat32.type).toEqual(new WglShaderMatrixType(3, 2));

        expect(mat4).toBeTruthy();
        expect(mat4.type).toEqual(new WglShaderMatrixType(4, 4));
    });

    describe('parse', () => {

        it('should work correctly', () => {
            expect(mat2 .parse()).toMatch(/^mat2\s*\(\s*\)$/ );
            expect(mat23.parse()).toMatch(/^mat23\s*\(\s*\)$/);
            expect(mat3 .parse()).toMatch(/^mat3\s*\(\s*\)$/ );
            expect(mat32.parse()).toMatch(/^mat32\s*\(\s*\)$/);
            expect(mat4 .parse()).toMatch(/^mat4\s*\(\s*\)$/ );
        });

    });

});
