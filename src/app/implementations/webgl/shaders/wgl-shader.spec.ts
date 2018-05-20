import { WglShader } from './wgl-shader';
import { WglShaderTestingGlobalScope } from './testing/wgl-shader-testing-global-scope';

class TestingShaderValid extends WglShader {
    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.VERTEX_SHADER);
    }
    public parse(): string {
        return 'void main() { gl_Position = vec4(0.0, 0.0, 0.0, 0.0); }';
    }
}

class TestingShaderNoCompile extends WglShader {
    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.VERTEX_SHADER);
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
        expect(validShader.globalScope).toBeTruthy();
    });

    describe('compile', () => {

        it('should not throw an error with a valid shader', () => {
            validShader.compile();
        });

        it('should throw an error with a shader that parses but does not compile', () => {
            expect(() => invalidShader.compile()).toThrow();
        });

    });

    describe('addChild', () => {

        it('should throw an error', () => {
            expect(() => validShader.addChild(new WglShaderTestingGlobalScope())).toThrow();
        });

    });

});
