// tslint:disable-next-line:max-line-length
import { ShaderLValueDeclarationParser } from '../../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-l-value-declaration-parser';
import { ShaderVariable } from '../../../../../../../api/shaders/source/expression/lvalues/shader-variable';
import { ShaderVoidType } from '../../../../../../../api/shaders/source/expression/types/shader-void-type';
import { WglShaderVoidType } from '../../types/wgl-shader-void-type';

export class WglShaderLValueDeclarationParser implements ShaderLValueDeclarationParser {

    public readonly type: ShaderVoidType;
    public readonly variable: ShaderVariable;

    constructor(variable: ShaderVariable) {
        this.type = new WglShaderVoidType();
        this.variable = variable;
    }

    public parse(): string {
        return this.variable.type.parse() + ' ' + this.variable.name;
    }

    public parseVariable(): string {
        return this.variable.type.parse() + ' ' + this.variable.name;
    }

    public parseUniform(): string {
        return null;
    }

    public parseAttribute(): string {
        return null;
    }

    public parseVarying(): string {
        return null;
    }

}
