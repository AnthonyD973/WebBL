import { ShaderMatrixLiteral } from '../../../../../../api/shaders/source/expression/rvalues/shader-matrix-literal';
import { WglShaderMatrixType } from '../types/wgl-shader-matrix-type';

export class WglShaderMatrixLiteral implements ShaderMatrixLiteral {

    public readonly type: WglShaderMatrixType;

    constructor(numRows: number, numCols: number) {
        this.type = new WglShaderMatrixType(numRows, numCols);
    }

    public parse(): string {
        return this.type.parse() + '()';
    }

}
