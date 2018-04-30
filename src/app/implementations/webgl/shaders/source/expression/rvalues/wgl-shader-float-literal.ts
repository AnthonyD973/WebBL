import { ShaderFloatLiteral } from '../../../../../../api/shaders/source/expression/rvalues/shader-float-literal';
import { WglShaderFloatType } from '../types/wgl-shader-float-type';

export class WglShaderFloatLiteral implements ShaderFloatLiteral {

    public readonly value: number;
    public readonly type: WglShaderFloatType;

    constructor(value: number) {
        this.value = value;
        this.type = new WglShaderFloatType();
    }

    public parse(): string {
        let parsedString = String(this.value);
        const containsDotRegex = /\./;
        if (!containsDotRegex.test(parsedString)) {
            parsedString = parsedString + '.';
        }
        return parsedString;
    }

}
