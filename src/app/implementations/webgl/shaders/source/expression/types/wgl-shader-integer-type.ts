import { ShaderIntegerType } from '../../../../../../api/shaders/source/expression/types/shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpressionTypeVisitor } from '../../../../../../api/shaders/source/expression/shader-expression-type-visitor';

export class WglShaderIntegerType implements ShaderIntegerType {

    public parse(): string {
        return 'int';
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return v.visitInteger(this);
    }

}
