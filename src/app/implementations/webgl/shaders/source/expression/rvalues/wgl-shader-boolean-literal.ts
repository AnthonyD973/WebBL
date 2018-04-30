import { ShaderBooleanLiteral } from '../../../../../../api/shaders/source/expression/rvalues/shader-boolean-literal';
import { WglShaderBooleanType } from '../types/wgl-shader-boolean-type';
import { WglShaderPrimitiveParser as PParser } from '../../../util/wgl-shader-primitive-parser';

export class WglShaderBooleanLiteral implements ShaderBooleanLiteral {

    public readonly value: boolean;
    public readonly type: WglShaderBooleanType;

    constructor(value: boolean) {
        this.value = value;
        this.type = new WglShaderBooleanType();
    }

    public parse(): string {
        return PParser.parseBoolean(this.value);
    }

}
