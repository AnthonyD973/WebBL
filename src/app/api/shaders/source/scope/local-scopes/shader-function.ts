import { ShaderLocalScope } from '../shader-local-scope';
import { ShaderFunctionSignature } from '../../expression/types/shader-function-signature';
import { ShaderScope } from '../shader-scope';
import { ShaderVariable } from '../../expression/lvalues/shader-variable';
import { ShaderExpressionType } from '../../expression/shader-expression-type';
import { ShaderBlock } from '../../statement/shader-block';

export interface ShaderFunction extends ShaderLocalScope {

    readonly name: string;
    readonly ret: ShaderExpressionType;
    readonly params: ShaderVariable[];
    readonly signature: ShaderFunctionSignature;
    readonly codeBlock: ShaderBlock;

}
