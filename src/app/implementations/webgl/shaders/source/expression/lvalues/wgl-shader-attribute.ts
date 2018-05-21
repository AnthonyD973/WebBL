import { WglShaderInput } from './wgl-shader-input';
import { ShaderAttribute } from '../../../../../../api/shaders/source/expression/lvalues/shader-attribute';
// tslint:disable-next-line:max-line-length
import { ShaderGenericLValueParser } from '../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-generic-l-value-parser';

const TOKEN = 'attribute';

export class WglShaderAttribute extends WglShaderInput implements ShaderAttribute {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

    public acceptVisitor(v: ShaderGenericLValueParser): string {
        return v.parseAttribute(this);
    }

}
