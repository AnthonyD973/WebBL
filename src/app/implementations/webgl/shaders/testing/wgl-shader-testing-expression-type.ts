import { ShaderExpressionType } from '../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpressionTypeVisitor } from '../../../../api/shaders/source/expression/shader-expression-type-visitor';

export class WglShaderTestingExpressionType implements ShaderExpressionType {

    private parsedString: string;

    constructor(parsedString: string) {
        this.parsedString = parsedString;
    }

    public parse(): string {
        return this.parsedString;
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return v.visitFloat(this);
    }

}
