import { WglShaderInput } from './wgl-shader-input';
import { ShaderVaryingInputSide } from '../../../../../../api/shaders/source/expression/lvalues/shader-varying-input-side';
// tslint:disable-next-line:max-line-length
import { ShaderGenericLValueParser } from '../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-generic-l-value-parser';

const TOKEN = 'varying';

export class WglShaderVaryingInputSide extends WglShaderInput implements ShaderVaryingInputSide {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

    public acceptVisitor(v: ShaderGenericLValueParser): string {
        return v.parseVaryingInputSide(this);
    }

}
