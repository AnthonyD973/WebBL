import { VisitorDispatcher, Operation } from '../../../../../../../../util/visitor-dispatcher/visitor-dispatcher';
import { ShaderExpressionType } from '../../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderExpressionTypeVisitor } from '../../../types/wgl-shader-expression-type-visitor';
import { WglShaderVisitorDispatcher } from './wgl-shader-visitor-dispatcher';

const OP_NAME = 'divide';

export class WglShaderDivideVisitorDispatcher extends WglShaderVisitorDispatcher {

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
        const matrix  = [this.y, this.y, this.y, this.n, this.n]; // MATRIX
        const vector  = [this.y, this.y, this.y, this.n, this.v]; // VECTOR

        operations.push(boolean, float, int, matrix, vector);
    }

}
