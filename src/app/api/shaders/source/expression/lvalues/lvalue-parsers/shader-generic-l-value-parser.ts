import { Visitor } from '../../../../../../util/visitor-dispatcher/visitor';
import { ShaderVariable } from '../shader-variable';
import { ShaderUniform } from '../shader-uniform';
import { ShaderAttribute } from '../shader-attribute';
import { ShaderVaryingInputSide } from '../shader-varying-input-side';
import { ShaderVaryingOutputSide } from '../shader-varying-output-side';
import { ShaderExpression } from '../../shader-expression';

export interface ShaderGenericLValueParser extends Visitor<string, ShaderVariable>, ShaderExpression {

    parseVariable(variable: ShaderVariable): any;
    parseUniform(uniform: ShaderUniform): any;
    parseAttribute(attribute: ShaderAttribute): any;
    parseVaryingInputSide(varying: ShaderVaryingInputSide): any;
    parseVaryingOutputSide(varying: ShaderVaryingOutputSide): any;

}
