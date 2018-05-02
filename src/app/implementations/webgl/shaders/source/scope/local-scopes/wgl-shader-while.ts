import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderWhile } from '../../../../../../api/shaders/source/scope/local-scopes/shader-while';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderBlock } from '../../statement/wgl-shader-block';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';

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

    public addChild(c: ShaderLocalScope): void {
        if (this.children.length === 0) {
            super.addChild(c);
        }
        else {
            throw new Error(`Cannot add a child to a "${this.scopeName}" scope`);
        }
    }

}
