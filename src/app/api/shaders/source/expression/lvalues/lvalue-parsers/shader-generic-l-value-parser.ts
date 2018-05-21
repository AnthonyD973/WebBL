import { Visitor } from '../../../../../../util/visitor-dispatcher/visitor';
import { ShaderVariable } from '../shader-variable';
import { ShaderUniform } from '../shader-uniform';
import { ShaderAttribute } from '../shader-attribute';
import { ShaderVarying } from '../shader-varying';

export interface ShaderGenericLValueParser extends Visitor<string, ShaderVariable> {

    parseVariable(variable: ShaderVariable): any;
    parseUniform(uniform: ShaderUniform): any;
    parseAttribute(attribute: ShaderAttribute): any;
    parseVarying(varying: ShaderVarying): any;

}
