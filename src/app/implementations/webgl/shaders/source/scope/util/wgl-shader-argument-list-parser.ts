import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';

export class WglShaderArgumentListParser {

    public parseSignature(params: ShaderExpressionType[]): string {
        return null;
    }

    public parseDeclaration(params: WglShaderVariable[]): string {
        return null;
    }

    public parseFunctionCall(params: ShaderExpression[]): string {
        return null;
    }

}
