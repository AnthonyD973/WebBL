import { ShaderAbstractStatement } from './shader-abstract-statement';

export interface ShaderBlock extends ShaderAbstractStatement {

    readonly statements: ShaderAbstractStatement[];

}
