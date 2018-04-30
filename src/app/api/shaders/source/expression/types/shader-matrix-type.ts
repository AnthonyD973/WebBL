import { ShaderExpressionType } from '../shader-expression-type';

export interface ShaderMatrixDims {
    rows: number;
    cols: number;
}

export interface ShaderMatrixType extends ShaderExpressionType {

    readonly dims: ShaderMatrixDims;

}
