import { ShaderExpressionType } from '../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpressionTypeVisitor } from '../../../../api/shaders/source/expression/shader-expression-type-visitor';

export class WglShaderTestingExpressionType implements ShaderExpressionType {

    private shouldMatch: boolean;
    private parsedString: string;

    constructor(shouldMatch: boolean, parsedString: string) {
        this.shouldMatch = shouldMatch;
        this.parsedString = parsedString;
    }

    public matches(that: ShaderExpressionType): boolean {

        if (that instanceof WglShaderTestingExpressionType) {
            if ((that as WglShaderTestingExpressionType).shouldMatch) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            throw new Error(`'that' is not an instance of WglShaderTestingExpressionType.`);
        }

    }

    public parse(): string {
        return this.parsedString;
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return v.visitFloat(this);
    }

}
