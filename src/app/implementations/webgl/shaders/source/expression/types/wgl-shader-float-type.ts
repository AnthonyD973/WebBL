import { ShaderFloatType } from '../../../../../../api/shaders/source/expression/types/shader-float-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpressionTypeVisitor } from '../../../../../../api/shaders/source/expression/shader-expression-type-visitor';

export class WglShaderFloatType implements ShaderFloatType {

    public parse(): string {
        return 'float';
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return v.visitFloat(this);
    }

}
