import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { ShaderFor } from '../../../../../../api/shaders/source/scope/local-scopes/shader-for';
import { ShaderWhile } from '../../../../../../api/shaders/source/scope/local-scopes/shader-while';

export class WglShaderEmptyLocalScope implements ShaderLocalScope {

    public readonly child: ShaderLocalScope;

    private hasParent = false;
    private parentInternal: ShaderLocalScope;

    public get parent(): ShaderLocalScope {
        return this.parentInternal;
    }

    public get scopeName(): string {
        return 'empty-scope';
    }

    constructor() {
        this.parentInternal = this;
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

    public while(condExpr: ShaderExpression): ShaderWhile {
        throw this.errorNoChildAllowed();
    }

    public makeParentOf(c: ShaderLocalScope): void {
        throw this.errorNoChildAllowed();
    }

    public setParent(p: ShaderLocalScope): void {
        if (!this.hasParent) {
            this.parentInternal = p;
            this.hasParent = true;
        }
        else {
            throw new Error(`Cannot set parent of "${this.scopeName}": Already have a parent`);
        }
    }

    public parse(): string {
        return '';
    }

    private errorNoChildAllowed(): Error {
        throw new Error(`Cannot add a child to the empty scope`);
    }

}
