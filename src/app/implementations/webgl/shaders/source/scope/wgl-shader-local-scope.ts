import { ShaderLocalScope } from '../../../../../api/shaders/source/scope/shader-local-scope';
import { WglError } from '../../../util/wgl-error';
import { WglShaderEmptyLocalScope } from './local-scopes/wgl-shader-empty-local-scope';

export abstract class WglShaderLocalScope implements ShaderLocalScope {

    public readonly parent: WglShaderLocalScope;
    public get child(): ShaderLocalScope {
        return this.childInternal;
    }

    private childInternal: ShaderLocalScope;
    private hasChild = false;
    private hasEnded = false;

    public abstract get scopeName(): string;

    constructor(parent: WglShaderLocalScope) {
        this.parent = parent;
        this.childInternal = new WglShaderEmptyLocalScope(this);
        if (parent != null) {
            if (!parent.hasChild) {
                parent.childInternal = this;
                parent.hasChild = true;
            }
            else {
                throw new Error(`Cannot set parent of local scope: Parent "${parent.scopeName}" already has a child`);
            }
        }
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

}
