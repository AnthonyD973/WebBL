import { ShaderVectorType } from '../../../../../../api/shaders/source/expression/types/shader-vector-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderConfig as Cfg } from '../../../util/wgl-shader-config';
import { ShaderExpressionTypeVisitor } from '../../../../../../api/shaders/source/expression/shader-expression-type-visitor';
import { ShaderMatrixDims } from '../../../../../../api/shaders/source/expression/types/shader-matrix-type';

export class WglShaderVectorType implements ShaderVectorType {

    public readonly dims: ShaderMatrixDims;

    constructor(dim: number) {
        if (dim >= Cfg.DIM_MIN && dim <= Cfg.DIM_MAX) {
            this.dims = {rows: dim, cols: 1};
        }
        else {
            throw new Error(`Vector dimension (${dim}) is invalid`);
        }
    }

    public parse(): string {
        return 'vec' + String(this.dims.rows);
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return v.visitVector(this);
    }

}
