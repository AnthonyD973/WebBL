import { ShaderParsable } from './source/shader-parsable';
import { ShaderGlobalScope } from './source/scope/shader-global-scope';
import { ShaderScope } from './source/scope/shader-scope';

export interface Shader extends ShaderParsable, ShaderScope {

    readonly globalScope: ShaderGlobalScope;

    compile(): void;

}
