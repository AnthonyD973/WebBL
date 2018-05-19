import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderBlock } from '../../statement/wgl-shader-block';
import { ShaderElseIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-else-if';
import { ShaderElse } from '../../../../../../api/shaders/source/scope/local-scopes/shader-else';
import { WglShaderElseIf } from './wgl-shader-else-if';
import { WglShaderElse } from './wgl-shader-else';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { ShaderScopeNames } from '../../../../../../api/shaders/source/scope/shader-scope-names';

const TOKEN = 'if';

export class WglShaderIf extends WglShaderLocalScope implements ShaderIf {

    public readonly condition: ShaderExpression;
    public readonly elseIfs: ShaderElseIf[] = [];

    private elseInternal: ShaderElse;
    private hasElse = false;

    public get scopeName(): string {
        return ShaderScopeNames.if;
    }

    constructor(condition: ShaderExpression) {
        super();
        this.condition = condition;
        this.addChild(new WglShaderBlock());
    }

    public elseIf(condition: ShaderExpression): ShaderElseIf {
        if (!this.hasElse) {
            const elseIfStatement = new WglShaderElseIf(this, condition);
            this.elseIfs.push(elseIfStatement);
            return elseIfStatement;
        }
        else {
            throw new Error(`Cannot add a second "${ShaderScopeNames.elseIf}" clause to a "${this.scopeName}" scope`);
        }
    }

    public else(): ShaderElse {
        if (!this.hasElse) {
            const elseStatement = new WglShaderElse(this);
            this.hasElse = true;
            return elseStatement;
        }
        else {
            throw new Error(`Cannot add a second "${ShaderScopeNames.else}" clause to a "${this.scopeName}" scope`);
        }
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

}
