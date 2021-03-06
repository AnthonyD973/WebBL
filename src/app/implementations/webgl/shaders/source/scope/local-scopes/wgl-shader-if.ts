import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderBlock } from '../../statement/wgl-shader-block';
import { ShaderElseIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-else-if';
import { ShaderElse } from '../../../../../../api/shaders/source/scope/local-scopes/shader-else';
import { WglShaderElseIf } from './wgl-shader-else-if';
import { WglShaderElse } from './wgl-shader-else';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';

const TOKEN = 'if';

export class WglShaderIf extends WglShaderLocalScope implements ShaderIf {

    public readonly condition: ShaderExpression;

    private hasAlternateCase = false;

    public get scopeName(): string {
        return 'if';
    }

    constructor(condition: ShaderExpression) {
        super();
        this.condition = condition;
        this.addChild(new WglShaderBlock());
    }

    public elseIf(condition: ShaderExpression): ShaderElseIf {
        this.assertHasNoAlternateCase();
        this.hasAlternateCase = true;

        const elseIfStatement = new WglShaderElseIf(this, condition);
        return elseIfStatement;
    }

    public else(): ShaderElse {
        this.assertHasNoAlternateCase();
        this.hasAlternateCase = true;

        const elseStatement = new WglShaderElse(this);
        return elseStatement;
    }

    public parse(): string {
        let parsedStatement = TOKEN + ' (' + this.condition.parse() + ') ';
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

    protected assertHasNoAlternateCase(): void {
        if (this.hasAlternateCase) {
            throw new Error(`Cannot add an alternate case to an "${this.scopeName}" statement when it already has one`);
        }
    }

}
