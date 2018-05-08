import { ShaderParsable } from './source/shader-parsable';
import { ShaderGlobalScope } from './source/scope/shader-global-scope';

export interface Shader extends ShaderParsable {

    readonly globalScope: ShaderGlobalScope;

}
