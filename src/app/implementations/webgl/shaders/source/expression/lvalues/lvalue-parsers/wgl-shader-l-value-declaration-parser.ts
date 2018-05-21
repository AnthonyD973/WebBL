// tslint:disable-next-line:max-line-length
import { ShaderLValueDeclarationParser } from '../../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-l-value-declaration-parser';
import { ShaderVariable } from '../../../../../../../api/shaders/source/expression/lvalues/shader-variable';
import { ShaderVoidType } from '../../../../../../../api/shaders/source/expression/types/shader-void-type';
import { WglShaderVoidType } from '../../types/wgl-shader-void-type';

const UNIFORM_TOKEN   = 'uniform';
const ATTRIBUTE_TOKEN = 'attribute';
const VARYING_TOKEN   = 'varying';

export class WglShaderLValueDeclarationParser implements ShaderLValueDeclarationParser {

    public readonly type: ShaderVoidType;
    public readonly variable: ShaderVariable;

    constructor(variable: ShaderVariable) {
        this.type = new WglShaderVoidType();
        this.variable = variable;
    }

    public parse(): string {
        return this.variable.acceptVisitor(this);
    }

    public parseVariable(): string {
        return this.variable.type.parse() + ' ' + this.variable.name;
    }

    public parseUniform(): string {
        return UNIFORM_TOKEN + ' ' + this.variable.type.parse() + ' ' + this.variable.name;
    }

    public parseAttribute(): string {
        return ATTRIBUTE_TOKEN + ' ' + this.variable.type.parse() + ' ' + this.variable.name;
    }

    public parseVaryingInputSide(): string {
        return VARYING_TOKEN + ' ' + this.variable.type.parse() + ' ' + this.variable.name;
    }

    public parseVaryingOutputSide(): string {
        return VARYING_TOKEN + ' ' + this.variable.type.parse() + ' ' + this.variable.name;
    }

}
