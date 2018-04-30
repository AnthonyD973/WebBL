import { WglShaderVectorLiteral } from './wgl-shader-vector-literal';
import { WglShaderVectorType } from '../types/wgl-shader-vector-type';
import { WglShaderFloatType } from '../types/wgl-shader-float-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';

describe('WglShaderVectorLiteral', () => {

    let vector2: WglShaderVectorLiteral;
    let vector4: WglShaderVectorLiteral;

    beforeEach(() => {
        vector2 = new WglShaderVectorLiteral([Math.PI, -Math.PI]);
        vector4 = new WglShaderVectorLiteral([1.2, 2.1, -5.28, 2.78]);
    });

    it('should be created', () => {
        expect(vector2).toBeTruthy();
        expect(vector2.type).toEqual(new WglShaderVectorType(2));
        expect(vector2.values).toEqual([Math.PI, -Math.PI]);

        expect(vector4).toBeTruthy();
        expect(vector4.type).toEqual(new WglShaderVectorType(4));
        expect(vector4.values).toEqual([1.2, 2.1, -5.28, 2.78]);
    });

    describe('parse', () => {

        it('should work correctly', () => {
            expect(vector2.parse()).toMatch(/^vec2\s*\(3\.14159\d*,\s*-3\.14159\d*\)$/);
            expect(vector4.parse()).toMatch(/^vec4\s*\(1\.2,\s*2\.1,\s*-5\.28,\s*2\.78\)$/);
        });

        it('should make use of the simple GLSL vector literal syntax when all values are identical', () => {
            const v = new WglShaderVectorLiteral([1.0, 1.0, 1.0]);
            expect(v.parse()).toMatch(/^vec3\(1\.0?\)$/);
        });

    });

});
