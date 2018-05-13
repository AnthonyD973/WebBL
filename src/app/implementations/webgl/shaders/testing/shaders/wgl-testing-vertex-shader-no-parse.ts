import { VertexShader } from '../../../../../api/shaders/vertex-shader';
import { WglTestingShaderNoParse } from './wgl-testing-shader-no-parse';

export class WglTestingVertexShaderNoParse extends WglTestingShaderNoParse implements VertexShader {

    constructor(gl?: WebGLRenderingContext) {
        if (gl == null) {
            gl = document.createElement('canvas').getContext('webgl');
        }
        super(gl, gl.VERTEX_SHADER);
    }

}
