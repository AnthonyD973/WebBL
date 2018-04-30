import { ShaderVectorLiteral } from '../../../../../../api/shaders/source/expression/rvalues/shader-vector-literal';
import { WglShaderVectorType } from '../types/wgl-shader-vector-type';
import { WglShaderPrimitiveParser as PParser } from '../../../util/wgl-shader-primitive-parser';

const SEP = ', ';

export class WglShaderVectorLiteral implements ShaderVectorLiteral {

    public readonly values: number[];
    public readonly type: WglShaderVectorType;

    constructor(values: number[]) {
        this.values = values.slice();
        this.type = new WglShaderVectorType(values.length);
    }

    public parse(): string {
        let parsedString = 'vec' + this.type.dims.rows + '(';

        const haveSameValue = this.values.every(value => value === this.values[0]);

        if (!haveSameValue) {
            this.values.forEach(value => {
                parsedString += PParser.parseFloat(value) + SEP;
            });
            parsedString = parsedString.slice(0, parsedString.length - SEP.length);
        }
        else {
            parsedString += String(PParser.parseFloat(this.values[0]));
        }

        parsedString += ')';
        return parsedString;
    }

}
