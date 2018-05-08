import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';

export class WglFragmentShader implements FragmentShader {

    public readonly globalScope: WglShaderGlobalScope;

    constructor() {
        this.globalScope = new WglShaderGlobalScope();
    }

    public parse(): string {
        const parsedShader = this.globalScope.parse();
        return parsedShader;
    }

}
