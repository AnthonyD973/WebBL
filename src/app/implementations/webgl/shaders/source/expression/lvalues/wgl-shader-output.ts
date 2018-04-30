import { WglShaderVariable } from './wgl-shader-variable';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';

export class WglShaderOutput extends WglShaderVariable {

    constructor(name: string, type: ShaderExpressionType) {
        super(name, type);
    }

}
