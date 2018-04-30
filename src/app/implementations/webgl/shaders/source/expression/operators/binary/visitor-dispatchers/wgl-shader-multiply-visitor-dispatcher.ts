import { VisitorDispatcher, Operation } from '../../../../../../../../util/visitor-dispatcher/visitor-dispatcher';
import { ShaderExpressionType } from '../../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderExpressionTypeVisitor } from '../../../types/wgl-shader-expression-type-visitor';
import { WglShaderVisitorDispatcher } from './wgl-shader-visitor-dispatcher';
import { ShaderMatrixType } from '../../../../../../../../api/shaders/source/expression/types/shader-matrix-type';

const OP_NAME = 'mult';

export class WglShaderMultiplyVisitorDispatcher extends WglShaderVisitorDispatcher {

    constructor() {
        const operations: Operation<void>[][] = [];
        super(
            OP_NAME,
            operations
        );
        this.makeOperations(operations);
    }

    protected makeOperations(operations: Operation<void>[][]): void {
        const vecMat = (v1: ShaderMatrixType, v2: ShaderMatrixType) => {
            const isValid = v1.dims.rows === v2.dims.rows;
            if (!isValid) {
                this.n(v1, v2);
            }
        };

        //                 BOOL,  FLOAT,    INT,    MAT,    VEC
        const boolean = [this.y, this.y, this.y, this.y , this.y ]; // BOOLEAN
        const float   = [this.y, this.y, this.y, this.y , this.y ]; // FLOAT
        const int     = [this.y, this.y, this.y, this.y , this.y ]; // INTEGER
        const matrix  = [this.y, this.y, this.y, this.mm, this.mm]; // MATRIX
        const vector  = [this.y, this.y, this.y, vecMat , this.m ]; // VECTOR

        operations.push(boolean, float, int, matrix, vector);
    }

}
