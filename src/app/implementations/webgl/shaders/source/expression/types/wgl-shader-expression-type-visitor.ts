import { ShaderExpressionTypeVisitor } from '../../../../../../api/shaders/source/expression/shader-expression-type-visitor';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';

const BOOLEAN   = 0;
const FLOAT     = 1;
const INTEGER   = 2;
const MATRIX    = 3;
const VECTOR    = 4;

export class WglShaderExpressionTypeVisitor implements ShaderExpressionTypeVisitor {

    public visitBoolean(b: ShaderExpressionType): number {
        return BOOLEAN;
    }

    public visitFloat(f: ShaderExpressionType): number {
        return FLOAT;
    }

    public visitInteger(i: ShaderExpressionType): number {
        return INTEGER;
    }

    public visitMatrix(m: ShaderExpressionType): number {
        return MATRIX;
    }

    public visitVector(v: ShaderExpressionType): number {
        return VECTOR;
    }

}
