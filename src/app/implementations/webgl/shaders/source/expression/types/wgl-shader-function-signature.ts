import { ShaderFunctionSignature } from '../../../../../../api/shaders/source/expression/types/shader-function-signature';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { Visitor } from '../../../../../../util/visitor-dispatcher/visitor';

export class WglShaderFunctionSignature implements ShaderFunctionSignature {

    public readonly params: ShaderExpressionType[];
    public readonly return: ShaderExpressionType;

    constructor(params: ShaderExpressionType[], ret: ShaderExpressionType) {
        this.params = params;
        this.return = ret;
    }

    public acceptVisitor(v: Visitor<number, ShaderExpressionType>): number {
        // TODO
        return null;
    }

    public parse(): string {
        // TODO
        return null;
    }

}
