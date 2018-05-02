import { WglShaderIf } from './wgl-shader-if';
import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';

const TOKEN = 'else if';

export class WglShaderElseIf extends WglShaderIf {

    public get scopeName(): string {
        return 'else if';
    }

    constructor(parentIf: ShaderIf, condition: ShaderExpression) {
        super(condition);
        parentIf.parent.addChild(this);
    }

    public parse(): string {
        let parsedStatement = TOKEN + '(' + this.condition.parse() + ') ';
        this.children.forEach(child => parsedStatement = parsedStatement + child.parse());
        return parsedStatement;
    }

}
