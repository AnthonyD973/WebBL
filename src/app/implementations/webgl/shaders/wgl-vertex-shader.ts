import { VertexShader } from '../../../api/shaders/vertex-shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';

export class WglVertexShader implements VertexShader {

    public readonly globalScope: WglShaderGlobalScope;

    constructor() {
        this.globalScope = new WglShaderGlobalScope();
    }

    public compile(): void {
    }

    public parse(): string {
        const parsedShader = this.globalScope.parse();
        return parsedShader;
    }

}
