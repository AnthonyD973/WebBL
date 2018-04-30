import { ShaderLocalScope } from '../shader-local-scope';
import { ShaderFunctionSignature } from '../../expression/types/shader-function-signature';
import { ShaderScope } from '../shader-scope';

export interface ShaderFunction extends ShaderLocalScope {

    readonly name: string;
    readonly signature: ShaderFunctionSignature;

}
