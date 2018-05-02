import { ShaderAbstractStatement } from './shader-abstract-statement';
import { ShaderLocalScope } from '../scope/shader-local-scope';

export interface ShaderBlock extends ShaderAbstractStatement, ShaderLocalScope {

    readonly statements: ShaderAbstractStatement[];

}
