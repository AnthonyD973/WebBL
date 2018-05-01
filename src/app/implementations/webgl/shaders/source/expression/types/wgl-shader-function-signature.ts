import { ShaderFunctionSignature } from '../../../../../../api/shaders/source/expression/types/shader-function-signature';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { Visitor } from '../../../../../../util/visitor-dispatcher/visitor';
import { WglShaderArgumentListParser } from '../../scope/util/wgl-shader-argument-list-parser';

export class WglShaderFunctionSignature implements ShaderFunctionSignature {

    public readonly params: ShaderExpressionType[];
    public readonly return: ShaderExpressionType;

    constructor(params: ShaderExpressionType[], ret: ShaderExpressionType) {
        this.params = params;
        this.return = ret;
    }

    public acceptVisitor(v: Visitor<number, ShaderExpressionType>): number {
        return this.return.acceptVisitor(v);
    }

    public parse(): string {
        return this.return.parse() + new WglShaderArgumentListParser().parseSignature(this.params);
    }

}
