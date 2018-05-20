import { Shader } from '../../../../../api/shaders/shader';
import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { WglShader } from '../../wgl-shader';

export class WglTestingShaderNoParse extends WglShader {

    public parse(): any {
        throw new Error(`This testing class is built so that the parse method throws an error`);
    }

    public compile(): void {
        this.parse();
    }

}
