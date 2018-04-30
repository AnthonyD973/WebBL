import { ShaderExpression } from './shader-expression';
import { Visitor } from '../../../../util/visitor-dispatcher/visitor';
import { ShaderExpressionType } from './shader-expression-type';

export interface ShaderExpressionTypeVisitor extends Visitor<number, ShaderExpressionType> {

    visitBoolean    (b: ShaderExpressionType):      number;
    visitFloat      (f: ShaderExpressionType):      number;
    visitInteger    (i: ShaderExpressionType):      number;
    visitMatrix     (m: ShaderExpressionType):      number;
    visitVector     (v: ShaderExpressionType):      number;

}
