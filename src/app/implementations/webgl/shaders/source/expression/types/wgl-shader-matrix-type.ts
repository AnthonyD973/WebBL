import { ShaderMatrixType, ShaderMatrixDims } from '../../../../../../api/shaders/source/expression/types/shader-matrix-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderConfig as Cfg } from '../../../util/wgl-shader-config';
import { ShaderExpressionTypeVisitor } from '../../../../../../api/shaders/source/expression/shader-expression-type-visitor';

export class WglShaderMatrixType implements ShaderMatrixType {

    public readonly dims: ShaderMatrixDims;

    constructor(rows: number, cols: number) {
        if (rows >= Cfg.DIM_MIN && rows <= Cfg.DIM_MAX && cols >= Cfg.DIM_MIN && cols <= Cfg.DIM_MAX) {
            this.dims = { rows: rows, cols: cols };
        }
        else {
            throw new Error(`Matrix dimensions (${rows}x${cols}) are invalid`);
        }
    }

    public parse(): string {
        const suffix = this.dims.rows !== this.dims.cols
                     ? String(this.dims.rows) + String(this.dims.cols)
                     : String(this.dims.rows);
        return 'mat' + suffix;
    }

    public acceptVisitor(v: ShaderExpressionTypeVisitor): number {
        return v.visitMatrix(this);
    }

}
