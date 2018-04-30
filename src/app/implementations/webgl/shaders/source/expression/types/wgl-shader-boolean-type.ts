import { ShaderBooleanType } from '../../../../../../api/shaders/source/expression/types/shader-boolean-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpressionTypeVisitor } from '../../../../../../api/shaders/source/expression/shader-expression-type-visitor';

export class WglShaderBooleanType implements ShaderBooleanType {

    public parse(): string {
        return 'bool';
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return v.visitBoolean(this);
    }

}
