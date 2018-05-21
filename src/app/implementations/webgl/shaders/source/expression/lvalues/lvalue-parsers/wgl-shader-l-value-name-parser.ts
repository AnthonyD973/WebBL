// tslint:disable-next-line:max-line-length
import { ShaderLValueNameParser } from '../../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-l-value-name-parser';
import { ShaderExpressionType } from '../../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderVariable } from '../../../../../../../api/shaders/source/expression/lvalues/shader-variable';

export class WglShaderLValueNameParser implements ShaderLValueNameParser {

    public readonly type: ShaderExpressionType;
    public readonly variable: ShaderVariable;

    constructor(variable: ShaderVariable) {
        this.type = variable.type;
        this.variable = variable;
    }

    public parse(): string {
        return this.variable.name;
    }

}
