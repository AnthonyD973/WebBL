import { ShaderVariable } from '../../../../../../api/shaders/source/expression/lvalues/shader-variable';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderAssignment } from '../operators/binary/wgl-shader-assignment';
import { WglShaderConfig as Cfg } from '../../../util/wgl-shader-config';

export class WglShaderVariable implements ShaderVariable {

    public readonly name: string;
    public readonly type: ShaderExpressionType;

    constructor(name: string, type: ShaderExpressionType) {
        if (name !== null && Cfg.IDENTIFIER_REGEX.test(name)) {
            this.name = name;
            this.type = type;
        }
        else {
            if (name === null) {
                throw new Error(`Identifier name is null`);
            }
            else {
                throw new Error(`Name "${name}" is an invalid identifier for a variable`);
            }
        }
    }

    public parse(): string {
        return (this.type.parse() as String) + ' ' + this.name + ';';
    }

}
