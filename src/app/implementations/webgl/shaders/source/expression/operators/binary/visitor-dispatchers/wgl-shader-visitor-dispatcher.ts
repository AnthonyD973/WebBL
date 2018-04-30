import { VisitorDispatcher, Operation } from '../../../../../../../../util/visitor-dispatcher/visitor-dispatcher';
import { ShaderExpressionType } from '../../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderExpressionTypeVisitor } from '../../../types/wgl-shader-expression-type-visitor';
import { Visitee } from '../../../../../../../../util/visitor-dispatcher/visitee';
import { ShaderBinaryOperator } from '../../../../../../../../api/shaders/source/expression/operators/shader-binary-operator';
import { ShaderMatrixType } from '../../../../../../../../api/shaders/source/expression/types/shader-matrix-type';
import { ShaderVectorType } from '../../../../../../../../api/shaders/source/expression/types/shader-vector-type';

export abstract class WglShaderVisitorDispatcher
    extends
        VisitorDispatcher<
            void, ShaderExpressionType, ShaderExpressionType, WglShaderExpressionTypeVisitor, WglShaderExpressionTypeVisitor
        > {

    // "Matrix". Asserts whether the matrices' dimensions are equal.
    protected readonly m: Operation<void>;

    // "Matrix Multiply". Asserts whether the matrices can be multiplied.
    protected readonly mm: Operation<void>;

    // "Vector". Asserts whether the vectors' dimensions are equal.
    protected readonly v: Operation<void>;

    // "Yes". Means the operation on v1 and v2 is valid.
    protected readonly y: Operation<void>;

    // "No". Means the operation on v1 and v2 is invalid.
    protected readonly n: Operation<void>;

    constructor(opName: string, operations: Operation<void>[][]) {
        super(
            opName,
            operations,
            new WglShaderExpressionTypeVisitor(),
            new WglShaderExpressionTypeVisitor()
        );
        this.y  = this.yInternal .bind(this);
        this.n  = this.nInternal .bind(this);
        this.m  = this.mInternal .bind(this);
        this.mm = this.mmInternal.bind(this);
        this.v  = this.vInternal .bind(this);
    }

    private yInternal(v1: ShaderExpressionType, v2: ShaderExpressionType): void {
    }

    private nInternal(v1: ShaderExpressionType, v2: ShaderExpressionType): void {
        throw new Error(`Operation "${this.operationName}" is invalid on given types`);
    }

    private mInternal(v1: ShaderMatrixType, v2: ShaderMatrixType): void {
        const isValid = v1.dims.rows === v2.dims.rows && v1.dims.cols === v2.dims.cols;
        if (!isValid) {
            this.n(v1, v2);
        }
    }

    private mmInternal(v1: ShaderMatrixType, v2: ShaderMatrixType): void {
        const isValid = v1.dims.cols === v2.dims.rows;
        if (!isValid) {
            this.n(v1, v2);
        }
    }

    private vInternal(v1: ShaderVectorType, v2: ShaderVectorType): void {
        const isValid = v1.dims === v2.dims;
        if (!isValid) {
            this.n(v1, v2);
        }
    }

}
