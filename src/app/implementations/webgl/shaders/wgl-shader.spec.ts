import { WglShader } from './wgl-shader';
import { ShaderGlobalScope } from '../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderVertexShaderGlobalScope } from './source/scope/global-scopes/wgl-shader-vertex-shader-global-scope';

class TestingShaderValid extends WglShader {
    public readonly globalScope: ShaderGlobalScope;
    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.VERTEX_SHADER);
        this.globalScope = new WglShaderVertexShaderGlobalScope(this);
    }
    public parse(): string {
        return 'void main() { gl_Position = vec4(0.0, 0.0, 0.0, 0.0); }';
    }
}

class TestingShaderNoCompile extends WglShader {
    public readonly globalScope: ShaderGlobalScope;
    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.VERTEX_SHADER);
        this.globalScope = new WglShaderVertexShaderGlobalScope(this);
    }
    public parse(): string {
        return 'THIS STRING IS NOT A VALID GLSL VERTEX SHADER, UNLESS CHUCK N.RRIS DECIDES OTHERWISE';
    }
}

describe(WglShader.name, () => {

    let gl: WebGLRenderingContext;
    let validShader: TestingShaderValid;
    let invalidShader: TestingShaderNoCompile;

    beforeEach(() => {
        gl = document.createElement('canvas').getContext('webgl');
        validShader = new TestingShaderValid(gl);
        invalidShader = new TestingShaderNoCompile(gl);
    });

    it('should be created', () => {
        expect(validShader).toBeTruthy();
    });

    describe('compile', () => {

        it('should not throw an error with a valid shader', () => {
            validShader.compile();
        });

        it('should throw an error with a shader that parses but does not compile', () => {
            expect(() => invalidShader.compile()).toThrow();
        });

    });

});
