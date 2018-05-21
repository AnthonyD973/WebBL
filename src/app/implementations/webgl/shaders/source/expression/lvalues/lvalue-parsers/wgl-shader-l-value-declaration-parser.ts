// tslint:disable-next-line:max-line-length
import { ShaderLValueDeclarationParser } from '../../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-l-value-declaration-parser';
import { WglShaderVoidType } from '../../types/wgl-shader-void-type';
import { ShaderVariable } from '../../../../../../../api/shaders/source/expression/lvalues/shader-variable';

export class WglShaderLValueDeclarationParser implements ShaderLValueDeclarationParser {

    public readonly type: WglShaderVoidType;
    public readonly variable: ShaderVariable;

    constructor(variable: ShaderVariable) {
    }

    public parse(): string {
        return null;
    }

}
