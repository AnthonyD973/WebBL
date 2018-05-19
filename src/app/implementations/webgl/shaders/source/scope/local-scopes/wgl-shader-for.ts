import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderFor } from '../../../../../../api/shaders/source/scope/local-scopes/shader-for';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderBlock } from '../../statement/wgl-shader-block';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { ShaderScopeNames } from '../../../../../../api/shaders/source/scope/shader-scope-names';

const TOKEN = 'for';

export class WglShaderFor extends WglShaderLocalScope implements ShaderFor {

    public readonly init: ShaderExpression;
    public readonly condition: ShaderExpression;
    public readonly loop: ShaderExpression;

    public get scopeName(): string {
        return ShaderScopeNames.for;
    }

    constructor(init: ShaderExpression, condition: ShaderExpression, loop: ShaderExpression) {
        super();
        this.init = init;
        this.condition = condition;
        this.loop = loop;
        this.children.push(new WglShaderBlock());
    }

    public parse(): string {
        let parsedStatement = TOKEN + '(' + this.init.parse() + '; ' + this.condition.parse() + '; ' + this.loop.parse() + ') ';
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
