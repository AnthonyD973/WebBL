import { WglShaderIf } from './wgl-shader-if';
import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';

const TOKEN = 'else if';

export class WglShaderElseIf extends WglShaderIf {

    public get scopeName(): string {
        return 'else if';
    }

    constructor(condition: ShaderExpression) {
        super(condition);
    }

    public parse(): string {
        return TOKEN + '(' + this.condition.parse() + ') ' + this.child.parse();
    }

}
