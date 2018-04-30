import { ShaderExpression } from '../../../../api/shaders/source/expression/shader-expression';
import { ShaderExpressionType } from '../../../../api/shaders/source/expression/shader-expression-type';

export class WglShaderTestingExpression implements ShaderExpression {

    public readonly type: ShaderExpressionType;
    public readonly parsedString: string;

    constructor(type: ShaderExpressionType, parsedString: string) {
        this.type = type;
        this.parsedString = parsedString;
    }

    public parse(): string {
        return this.parsedString;
    }

}
