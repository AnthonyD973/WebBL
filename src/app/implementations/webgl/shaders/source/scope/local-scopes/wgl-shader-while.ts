import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderWhile } from '../../../../../../api/shaders/source/scope/local-scopes/shader-while';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

const TOKEN = 'while';

export class WglShaderWhile extends WglShaderLocalScope implements ShaderWhile {

    public readonly condition: ShaderExpression;

    public get scopeName(): string {
        return 'while';
    }

    constructor(condition: ShaderExpression) {
        super();
        this.condition = condition;
        this.addChild(new WglShaderBlock());
    }

    public parse(): string {
        let parsedStatement = TOKEN + '(' + this.condition.parse() + ') ';
        this.children.forEach(child => parsedStatement = parsedStatement + child.parse());
        return parsedStatement;
    }

}
