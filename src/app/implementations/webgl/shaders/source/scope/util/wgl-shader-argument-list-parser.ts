import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';

export class WglShaderArgumentListParser {

    public parseSignature(params: ShaderExpressionType[]): string {
        const parsedArgList = params.reduce((acc, param) => {
            const isFirstParam = acc === '';
            if (isFirstParam) {
                return param.parse();
            }
            else {
                return acc + ', ' + param.parse();
            }
        }, '');

        return '(' + parsedArgList + ')';
    }

    public parseDeclaration(params: WglShaderVariable[]): string {
        const parsedArgList = params.reduce((acc, param) => {
            const isFirstParam = acc === '';
            if (isFirstParam) {
                return param.type.parse() + ' ' + param.name;
            }
            else {
                return acc + ', ' + param.type.parse() + ' ' + param.name;
            }
        }, '');

        return '(' + parsedArgList + ')';
    }

    public parseFunctionCall(params: ShaderExpression[]): string {
        const parsedArgList = params.reduce((acc, param) => {
            const isFirstParam = acc === '';
            if (isFirstParam) {
                return param.parse();
            }
            else {
                return acc + ', ' + param.parse();
            }
        }, '');

        return '(' + parsedArgList + ')';
    }

}
