import { WglShaderFragmentShaderGlobalScope } from './wgl-shader-fragment-shader-global-scope';
import { WglFragmentShader } from '../../../wgl-fragment-shader';
import { WglTestingFragmentShaderValid } from '../../../testing/shaders/wgl-testing-fragment-shader-valid';
import { WglShaderAttribute } from '../../expression/lvalues/wgl-shader-attribute';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { WglShaderVaryingOutputSide } from '../../expression/lvalues/wgl-shader-varying-output-side';

describe(WglShaderFragmentShaderGlobalScope.name, () => {

    let shader: WglFragmentShader;
    let scope: WglShaderFragmentShaderGlobalScope;

    beforeEach(() => {
        shader = new WglTestingFragmentShaderValid();
        scope = new WglShaderFragmentShaderGlobalScope(shader);
    });

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.parent).toBe(shader);
    });

    describe('createInput', () => {

        it('should return something that behaves like an varying', () => {
            const refVarying = new WglShaderAttribute('rColor', new WglShaderIntegerType());
            const varying = scope.createInput('rColor', new WglShaderIntegerType());

            expect(varying.name).toEqual(refVarying.name);
            expect(varying.type).toEqual(refVarying.type);
            expect(varying.parse()).toEqual(refVarying.parse());
            expect(varying.isReadable()).toEqual(refVarying.isReadable());
            expect(varying.isWritable()).toEqual(refVarying.isWritable());
        });

    });

    describe('createOutput', () => {

        it('should throw an error', () => {
            expect(() => scope.createOutput('rColor', new WglShaderIntegerType())).toThrow();
        });

    });

});
