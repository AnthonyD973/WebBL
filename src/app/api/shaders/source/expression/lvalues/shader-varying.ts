import { ShaderVariable } from './shader-variable';
import { ShaderVaryingInputSide } from './shader-varying-input-side';
import { ShaderVaryingOutputSide } from './shader-varying-output-side';

export interface ShaderVarying {

    inputSide: ShaderVaryingInputSide;
    outputSide: ShaderVaryingOutputSide;

}
