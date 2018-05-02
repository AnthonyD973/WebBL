import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderBlock } from '../../statement/wgl-shader-block';
import { ShaderElseIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-else-if';
import { ShaderElse } from '../../../../../../api/shaders/source/scope/local-scopes/shader-else';
import { WglShaderElseIf } from './wgl-shader-else-if';
import { WglShaderElse } from './wgl-shader-else';

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
        this.makeParentOf(new WglShaderBlock());
    }

    public elseIf(condition: ShaderExpression): ShaderElseIf {
        this.assertHasNoAlternateCase();
        this.hasAlternateCase = true;
        return null; // new WglShaderElseIf(condition);
    }

    public else(): ShaderElse {
        this.assertHasNoAlternateCase();
        this.hasAlternateCase = true;

        const elseStatement = new WglShaderElse();
        this.parent.makeParentOf(elseStatement);
        return elseStatement;
    }

    public parse(): string {
        return TOKEN + ' (' + this.condition.parse() + ') ' + this.child.parse();
    }

    protected assertHasNoAlternateCase(): void {
        if (this.hasAlternateCase) {
            throw new Error(`Cannot add an alternate case to an "${this.scopeName}" statement when it already has one`);
        }
    }

}
