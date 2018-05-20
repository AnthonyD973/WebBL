import { WglShaderGlobalScope } from '../wgl-shader-global-scope';
import { ShaderAttribute } from '../../../../../../api/shaders/source/expression/lvalues/shader-attribute';
import { WglShaderAttribute } from '../../expression/lvalues/wgl-shader-attribute';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderVaryingOutputSide } from '../../../../../../api/shaders/source/expression/lvalues/shader-varying-output-side';
import { WglShaderVaryingOutputSide } from '../../expression/lvalues/wgl-shader-varying-output-side';

export class WglShaderVertexShaderGlobalScope extends WglShaderGlobalScope {

    public createInput(name: string, type: ShaderExpressionType): ShaderAttribute {
        return new WglShaderAttribute(name, type);
    }

    public createOutput(name: string, type: ShaderExpressionType): ShaderVaryingOutputSide {
        return new WglShaderVaryingOutputSide(name, type);
    }

}
