import { ShaderVoidType } from '../../../../../../api/shaders/source/expression/types/shader-void-type';
import { ShaderExpressionTypeVisitor } from '../../../../../../api/shaders/source/expression/shader-expression-type-visitor';

export class WglShaderVoidType implements ShaderVoidType {

    public parse(): string {
        return null;
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return null;
    }

}
