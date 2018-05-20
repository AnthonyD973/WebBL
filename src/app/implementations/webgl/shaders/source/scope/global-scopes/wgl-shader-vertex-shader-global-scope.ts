import { WglShaderGlobalScope } from '../wgl-shader-global-scope';
import { ShaderAttribute } from '../../../../../../api/shaders/source/expression/lvalues/shader-attribute';
import { WglShaderAttribute } from '../../expression/lvalues/wgl-shader-attribute';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderVaryingOutputSide } from '../../../../../../api/shaders/source/expression/lvalues/shader-varying-output-side';
import { WglShaderVaryingOutputSide } from '../../expression/lvalues/wgl-shader-varying-output-side';

export class WglShaderVertexShaderGlobalScope extends WglShaderGlobalScope {

    public createInput(name: string, type: ShaderExpressionType): ShaderAttribute {
        this.assertIdentifierIsValid(name);
        const input = new WglShaderAttribute(name, type);
        this.inputs.set(name, input);
        return input;
    }

    public createOutput(name: string, type: ShaderExpressionType): ShaderVaryingOutputSide {
        this.assertIdentifierIsValid(name);
        const output = new WglShaderVaryingOutputSide(name, type);
        this.outputs.set(name, output);
        return output;
    }

}
