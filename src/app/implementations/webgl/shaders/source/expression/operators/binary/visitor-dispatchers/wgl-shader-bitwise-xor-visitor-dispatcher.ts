import { VisitorDispatcher, Operation } from '../../../../../../../../util/visitor-dispatcher/visitor-dispatcher';
import { ShaderExpressionType } from '../../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderExpressionTypeVisitor } from '../../../types/wgl-shader-expression-type-visitor';
import { WglShaderVisitorDispatcher } from './wgl-shader-visitor-dispatcher';

const OP_NAME = 'bwxor';

export class WglShaderBitwiseXorVisitorDispatcher extends WglShaderVisitorDispatcher {

    constructor() {
        const operations: Operation<void>[][] = [];
        super(
            OP_NAME,
            operations
        );
        this.makeOperations(operations);
    }

    protected makeOperations(operations: Operation<void>[][]): void {
        //                 BOOL,  FLOAT,    INT,    MAT,    VEC,   VOID
        const boolean = [this.y, this.y, this.y, this.n, this.n, this.n]; // BOOLEAN
        const float   = [this.y, this.y, this.y, this.n, this.n, this.n]; // FLOAT
        const int     = [this.y, this.y, this.y, this.n, this.n, this.n]; // INTEGER
        const matrix  = [this.n, this.n, this.n, this.n, this.n, this.n]; // MATRIX
        const vector  = [this.n, this.n, this.n, this.n, this.n, this.n]; // VECTOR
        const void_   = [this.n, this.n, this.n, this.n, this.n, this.n]; // VOID

        operations.push(boolean, float, int, matrix, vector, void_);
    }

}
