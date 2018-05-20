import { WglShaderGlobalScope } from '../wgl-shader-global-scope';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderVaryingInputSide } from '../../../../../../api/shaders/source/expression/lvalues/shader-varying-input-side';
import { WglShaderVaryingInputSide } from '../../expression/lvalues/wgl-shader-varying-input-side';
import { ShaderOutput } from '../../../../../../api/shaders/source/expression/lvalues/shader-output';

export class WglShaderFragmentShaderGlobalScope extends WglShaderGlobalScope {

    public createInput(name: string, type: ShaderExpressionType): ShaderVaryingInputSide {
        this.assertIdentifierIsValid(name);
        const input = new WglShaderVaryingInputSide(name, type);
        this.inputs.set(name, input);
        return input;
    }

    public createOutput(name: string, type: ShaderExpressionType): ShaderOutput {
        throw new Error(`Fragment shaders cannot produce output`);
    }

}
