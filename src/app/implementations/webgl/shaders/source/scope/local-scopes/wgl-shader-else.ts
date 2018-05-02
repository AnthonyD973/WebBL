import { WglShaderLocalScope } from '../wgl-shader-local-scope';

export class WglShaderElse extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'else';
    }

    constructor() {
        super();
    }

    public parse(): any {
        return null;
    }

}
