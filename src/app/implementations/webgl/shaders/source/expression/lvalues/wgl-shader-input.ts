import { WglShaderVariable } from './wgl-shader-variable';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';

export abstract class WglShaderInput extends WglShaderVariable {

    constructor(name: string, type: ShaderExpressionType) {
        super(name, type);
    }

    public assign(value: ShaderExpression): ShaderExpression {
        throw new Error(`Cannot assign value to shader input value ${this.name}`);
    }

    public isWritable(): boolean {
        return false;
    }

}
