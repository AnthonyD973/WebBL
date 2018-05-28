import { WglShaderOutput } from './wgl-shader-output';
import { ShaderVaryingOutputSide } from '../../../../../../api/shaders/source/expression/lvalues/shader-varying-output-side';
// tslint:disable-next-line:max-line-length
import { ShaderGenericLValueParser } from '../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-generic-l-value-parser';

const TOKEN = 'varying';

export class WglShaderVaryingOutputSide extends WglShaderOutput implements ShaderVaryingOutputSide {

    public acceptVisitor(v: ShaderGenericLValueParser): string {
        return v.parseVaryingOutputSide(this);
    }

}
