import { WglShaderVoidType } from '../../source/expression/types/wgl-shader-void-type';
import { VertexShader } from '../../../../../api/shaders/vertex-shader';
import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderGlobalScope } from '../../source/scope/wgl-shader-global-scope';

export abstract class WglTestingShaderValid implements VertexShader {

    public readonly globalScope: ShaderGlobalScope;

    constructor() {
        this.globalScope = new WglShaderGlobalScope();
        this.globalScope.createFunction('main', [], new WglShaderVoidType());
    }

    public compile(): void {
    }

    public parse(): string {
        return 'testParse';
    }

}
