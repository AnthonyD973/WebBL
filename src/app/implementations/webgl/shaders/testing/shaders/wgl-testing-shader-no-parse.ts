import { Shader } from '../../../../../api/shaders/shader';
import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderTestingGlobalScope } from '../wgl-shader-testing-global-scope';

export class WglTestingShaderNoParse implements Shader {

    public readonly globalScope: ShaderGlobalScope;

    constructor() {
        this.globalScope = new WglShaderTestingGlobalScope();
    }

    public parse(): any {
        throw new Error(`This testing class is built so that the parse method throws an error`);
    }

}
