import { ShaderExpression } from '../shader-expression';
import { ShaderExpressionType } from '../shader-expression-type';
import { Visitee } from '../../../../../util/visitor-dispatcher/visitee';

export interface ShaderVariable extends Visitee<string> {

    readonly name: string;
    readonly type: ShaderExpressionType;

    isReadable(): boolean;
    isWritable(): boolean;

}
