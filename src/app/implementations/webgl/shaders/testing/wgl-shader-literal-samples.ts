import { WglShaderBooleanLiteral } from '../source/expression/rvalues/wgl-shader-boolean-literal';
import { WglShaderFloatLiteral } from '../source/expression/rvalues/wgl-shader-float-literal';
import { WglShaderIntegerLiteral } from '../source/expression/rvalues/wgl-shader-integer-literal';
import { WglShaderMatrixLiteral } from '../source/expression/rvalues/wgl-shader-matrix-literal';
import { WglShaderVectorLiteral } from '../source/expression/rvalues/wgl-shader-vector-literal';

export class WglShaderLiteralSamples {

    public readonly bTrue = new WglShaderBooleanLiteral(true);
    public readonly fPi   = new WglShaderFloatLiteral(3.14);
    public readonly iPos  = new WglShaderIntegerLiteral(5);
    public readonly iNeg  = new WglShaderIntegerLiteral(-5);
    public readonly m32   = new WglShaderMatrixLiteral(3, 2);
    public readonly m23   = new WglShaderMatrixLiteral(2, 3);
    public readonly m3    = new WglShaderMatrixLiteral(3, 3);
    public readonly v2    = new WglShaderVectorLiteral([1, 2]);
    public readonly v3    = new WglShaderVectorLiteral([1, 2, 3]);
    public readonly v4    = new WglShaderVectorLiteral([1, 2, 3, 4]);

}
