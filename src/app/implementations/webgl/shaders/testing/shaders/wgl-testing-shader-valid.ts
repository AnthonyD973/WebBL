import { WglVertexShader } from '../../wgl-vertex-shader';
import { WglShaderVoidType } from '../../source/expression/types/wgl-shader-void-type';

export abstract class WglTestingShaderValid extends WglVertexShader {

    constructor() {
        super();
        this.globalScope.createFunction('main', [], new WglShaderVoidType());
    }

}
