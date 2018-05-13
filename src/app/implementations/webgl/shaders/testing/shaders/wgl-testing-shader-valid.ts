import { WglShaderVoidType } from '../../source/expression/types/wgl-shader-void-type';
import { VertexShader } from '../../../../../api/shaders/vertex-shader';
import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderGlobalScope } from '../../source/scope/wgl-shader-global-scope';
import { WglVertexShader } from '../../wgl-vertex-shader';

export abstract class WglTestingShaderValid extends WglVertexShader {

    constructor(gl?: WebGLRenderingContext) {
        if (!gl) {
            gl = document.createElement('canvas').getContext('webgl');
        }
        super(gl);
        this.globalScope.createFunction('main', [], new WglShaderVoidType());
    }

    public compile(): void {
    }

    public abstract parse(): string;

}
