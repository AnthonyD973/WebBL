import { VisitorDispatcher, Operation } from '../../../../../../../../util/visitor-dispatcher/visitor-dispatcher';
import { ShaderExpressionType } from '../../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderExpressionTypeVisitor } from '../../../types/wgl-shader-expression-type-visitor';
import { WglShaderVisitorDispatcher } from './wgl-shader-visitor-dispatcher';
import { ShaderBooleanExpression } from '../../../../../../../../api/shaders/source/expression/generic/shader-boolean-expression';
import { ShaderMatrixType } from '../../../../../../../../api/shaders/source/expression/types/shader-matrix-type';
import { ShaderVectorType } from '../../../../../../../../api/shaders/source/expression/types/shader-vector-type';

const OP_NAME = 'assign';

export class WglShaderAssignmentVisitorDispatcher extends WglShaderVisitorDispatcher {

    constructor() {
        const operations: Operation<void>[][] = [];
        super(
            OP_NAME,
            operations
        );
        this.makeOperations(operations);
    }

    protected makeOperations(operations: Operation<void>[][]): void {
        //                 BOOL,  FLOAT,    INT,    MAT,    VEC
        const boolean = [this.y, this.y, this.y, this.n, this.n]; // BOOLEAN
        const float   = [this.y, this.y, this.y, this.n, this.n]; // FLOAT
        const int     = [this.y, this.y, this.y, this.n, this.n]; // INTEGER
        const matrix  = [this.n, this.n, this.n, this.m, this.n]; // MATRIX
        const vector  = [this.n, this.n, this.n, this.n, this.v]; // VECTOR

        operations.push(boolean, float, int, matrix, vector);
    }

}
