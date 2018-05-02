import { ShaderLocalScope } from '../../../../../api/shaders/source/scope/shader-local-scope';
import { WglError } from '../../../util/wgl-error';
import { WglShaderEmptyLocalScope } from './local-scopes/wgl-shader-empty-local-scope';

export abstract class WglShaderLocalScope implements ShaderLocalScope {

    public get parent(): WglShaderLocalScope {
        return this.parentInternal;
    }

    private childInternal: ShaderLocalScope;
    private parentInternal: WglShaderLocalScope;
    private hasChild = false;
    private hasEnded = false;

    public get child(): ShaderLocalScope {
        return this.childInternal;
    }

    public abstract get scopeName(): string;

    constructor(parent: WglShaderLocalScope) {
    }

    public abstract parse(): string;

    public end(): void {
        this.checkIfEnded();
        this.hasEnded = true;
    }

    public if (): any {
        this.checkIfEnded();

    }

    public for(): any {
        this.checkIfEnded();

    }

    public while(): any {
        this.checkIfEnded();

    }

    protected checkIfEnded(): void {
        if (this.hasEnded) {
            throw new WglError(`Scope already ended`);
        }
    }

    public makeParentOf(c: WglShaderLocalScope): void {
        if (!this.hasChild) {
            this.childInternal = c;
            this.hasChild = true;
            c.parentInternal = this;
        }
        else {
            throw new Error(`Cannot set parent of "${c.scopeName}": Parent "${this.scopeName}" already has a child`);
        }

        this.childInternal = new WglShaderEmptyLocalScope(this);
    }

}
