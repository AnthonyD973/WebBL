import { ShaderLocalScope } from '../../../../../api/shaders/source/scope/shader-local-scope';
import { WglError } from '../../../util/wgl-error';
import { WglShaderEmptyLocalScope } from './local-scopes/wgl-shader-empty-local-scope';

export abstract class WglShaderLocalScope implements ShaderLocalScope {

    private childrenInternal: ShaderLocalScope[] = [];
    private parentInternal: ShaderLocalScope;
    private hasParent = false;
    private hasEnded = false;

    public get parent(): ShaderLocalScope {
        return this.parentInternal;
    }

    public get children(): ShaderLocalScope[] {
        return this.childrenInternal;
    }

    public abstract get scopeName(): string;

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

    public addChild(c: ShaderLocalScope): void {
        try {
            c.setParent(this);
        }
        catch (e) {
            throw new Error(`Cannot set parent of "${this.scopeName}": Child "${c.scopeName}" did not accept the parent. Cause: ` +
                `"${e.message || e}"`
            );
        }
        this.childrenInternal.push(c);
    }

    public setParent(p: ShaderLocalScope) {
        if (!this.hasParent) {
            this.parentInternal = p;
            this.hasParent = true;
        }
        else {
            throw new Error(`Cannot set parent of "${this.scopeName}": Already have a parent`);
        }
    }

    protected checkIfEnded(): void {
        if (this.hasEnded) {
            throw new WglError(`Scope already ended`);
        }
    }

}
