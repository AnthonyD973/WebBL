import { WglTestingShaderValid } from './wgl-testing-shader-valid';
import { FragmentShader } from '../../../../../api/shaders/fragment-shader';

export class WglTestingFragmentShaderValid extends WglTestingShaderValid implements FragmentShader {

    public parse(): string {
        return 'void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }';
    }

}
