import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { ShaderFor } from '../../../../../../api/shaders/source/scope/local-scopes/shader-for';
import { ShaderWhile } from '../../../../../../api/shaders/source/scope/local-scopes/shader-while';

export class WglShaderEmptyLocalScope implements ShaderLocalScope {

    public readonly parent: ShaderLocalScope;
    public readonly child: ShaderLocalScope;

    public get scopeName(): string {
        return 'empty-scope';
    }

    constructor(parent: ShaderLocalScope) {
        this.parent = parent;
        this.child = this;
    }

    public end(): void {
        throw new Error(`Cannot end the empty scope`);
    }

    public if(condExpr: ShaderExpression): ShaderLocalScope {
        throw this.errorNoChildAllowed();
    }

    public for(initExpr: ShaderExpression, condExpr: ShaderExpression, loopExpr: ShaderExpression): ShaderFor {
        throw this.errorNoChildAllowed();
    }

    public while(): ShaderWhile {
        throw this.errorNoChildAllowed();
    }

    public parse(): string {
        return '';
    }

    private errorNoChildAllowed(): Error {
        throw new Error(`Cannot add children to the empty scope`);
    }

}
