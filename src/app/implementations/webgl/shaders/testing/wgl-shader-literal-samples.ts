import { WglShaderBooleanLiteral } from '../source/expression/rvalues/wgl-shader-boolean-literal';
import { WglShaderFloatLiteral } from '../source/expression/rvalues/wgl-shader-float-literal';
import { WglShaderIntegerLiteral } from '../source/expression/rvalues/wgl-shader-integer-literal';
import { WglShaderMatrixLiteral } from '../source/expression/rvalues/wgl-shader-matrix-literal';
import { WglShaderVectorLiteral } from '../source/expression/rvalues/wgl-shader-vector-literal';

export class WglShaderLiteralSamples {

    public get bTrue(): WglShaderBooleanLiteral {
        return new WglShaderBooleanLiteral(true);
    }

    public get fPi(): WglShaderFloatLiteral {
        return new WglShaderFloatLiteral(3.14);
    }

    public get iPos(): WglShaderIntegerLiteral {
        return new WglShaderIntegerLiteral(5);
    }

    public get iNeg(): WglShaderIntegerLiteral {
        return new WglShaderIntegerLiteral(-5);
    }

    public get m32(): WglShaderMatrixLiteral {
        return new WglShaderMatrixLiteral(3, 2);
    }

    public get m23(): WglShaderMatrixLiteral {
        return new WglShaderMatrixLiteral(2, 3);
    }

    public get m3(): WglShaderMatrixLiteral {
        return new WglShaderMatrixLiteral(3, 3);
    }

    public get v2(): WglShaderVectorLiteral {
        return new WglShaderVectorLiteral(1, 2);
    }

    public get v3(): WglShaderVectorLiteral {
        return new WglShaderVectorLiteral(1, 2, 3);
    }

    public get v4(): WglShaderVectorLiteral {
        return new WglShaderVectorLiteral(1, 2, 3, 4);
    }


}
