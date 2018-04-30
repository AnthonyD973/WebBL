import { ShaderIntegerLiteral } from '../../../../../../api/shaders/source/expression/rvalues/shader-integer-literal';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';

export class WglShaderIntegerLiteral implements ShaderIntegerLiteral {

    public readonly value: number;
    public readonly type: WglShaderIntegerType;

    constructor(value: number) {
        this.value = Math.floor(value);
        this.type = new WglShaderIntegerType();
    }

    public parse(): string {
        return String(this.value);
    }

}
