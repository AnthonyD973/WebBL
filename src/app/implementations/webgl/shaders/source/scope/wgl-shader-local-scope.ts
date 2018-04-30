import { ShaderLocalScope } from '../../../../../api/shaders/source/scope/shader-local-scope';
import { WglError } from '../../../util/wgl-error';

export abstract class WglShaderLocalScope implements ShaderLocalScope {

    public parent: WglShaderLocalScope;
    private hasEnded = false;

    public abstract get scopeName(): string;

    constructor(parent: WglShaderLocalScope) {
        this.parent = parent;
    }

    public parse(): string {
        return null;
    }

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
