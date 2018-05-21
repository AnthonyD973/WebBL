import { ShaderExpression } from '../../shader-expression';
import { ShaderVoidType } from '../../types/shader-void-type';
import { ShaderVariable } from '../shader-variable';
import { ShaderGenericLValueParser } from './shader-generic-l-value-parser';

export interface ShaderLValueDeclarationParser extends ShaderGenericLValueParser {

    readonly type: ShaderVoidType;
    readonly variable: ShaderVariable;

}
