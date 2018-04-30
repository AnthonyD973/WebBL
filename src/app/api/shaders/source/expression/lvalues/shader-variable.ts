import { ShaderExpression } from '../shader-expression';
import { ShaderExpressionType } from '../shader-expression-type';

export interface ShaderVariable extends ShaderExpression {

    readonly name: string;
    readonly type: ShaderExpressionType;

    parse(): any;

}
