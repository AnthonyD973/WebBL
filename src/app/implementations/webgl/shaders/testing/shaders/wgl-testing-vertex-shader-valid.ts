import { WglTestingShaderValid } from './wgl-testing-shader-valid';
import { VertexShader } from '../../../../../api/shaders/vertex-shader';

export class WglTestingVertexShaderValid extends WglTestingShaderValid implements VertexShader {

    public parse(): string {
        return 'void main() { gl_Position = vec4(0.0, 0.0, 0.0, 0.0); }';
    }

}
