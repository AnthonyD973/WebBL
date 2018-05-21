import { ShaderExpression } from '../../shader-expression';
import { ShaderVoidType } from '../../types/shader-void-type';
import { ShaderVariable } from '../shader-variable';

export interface ShaderLValueDeclarationParser extends ShaderExpression {

    readonly type: ShaderVoidType;
    readonly variable: ShaderVariable;

}
