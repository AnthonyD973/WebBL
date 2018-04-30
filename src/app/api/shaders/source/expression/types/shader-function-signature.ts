import { ShaderExpressionType } from '../shader-expression-type';

export interface ShaderFunctionSignature extends ShaderExpressionType {

    readonly params: ShaderExpressionType[];
    readonly return: ShaderExpressionType;

}
