import { WglShaderVariable } from './wgl-shader-variable';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';

export abstract class WglShaderOutput extends WglShaderVariable {

    constructor(name: string, type: ShaderExpressionType) {
        super(name, type);
    }

    public isReadable(): boolean {
        return false;
    }

}
