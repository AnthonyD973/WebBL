import { FragmentShader } from '../../../../../api/shaders/fragment-shader';
import { WglTestingShaderNoParse } from './wgl-testing-shader-no-parse';

export class WglTestingFragmentShaderNoParse extends WglTestingShaderNoParse implements FragmentShader {

    constructor(gl?: WebGLRenderingContext) {
        if (gl == null) {
            gl = document.createElement('canvas').getContext('webgl');
        }
        super(gl, gl.FRAGMENT_SHADER);
    }

}
