import { WglShaderLocalScope } from '../../source/scope/wgl-shader-local-scope';

export class WglShaderTestingLocalScope extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'test-scope';
    }

    public parse(): string {
        return null;
    }

}
