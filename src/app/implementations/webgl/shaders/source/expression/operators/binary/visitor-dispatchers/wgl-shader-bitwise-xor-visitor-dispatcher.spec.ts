import { TestBed, inject } from '@angular/core/testing';
import { WglShaderBitwiseXorVisitorDispatcher } from './wgl-shader-bitwise-xor-visitor-dispatcher';
import { ShaderBooleanExpression } from '../../../../../../../../api/shaders/source/expression/generic/shader-boolean-expression';
import { ShaderFloatExpression } from '../../../../../../../../api/shaders/source/expression/generic/shader-float-expression';
import { ShaderIntegerExpression } from '../../../../../../../../api/shaders/source/expression/generic/shader-integer-expression';
import { ShaderMatrixExpression } from '../../../../../../../../api/shaders/source/expression/generic/shader-matrix-expression';
import { ShaderVectorExpression } from '../../../../../../../../api/shaders/source/expression/generic/shader-vector-expression';
import { WglShaderBooleanLiteral } from '../../../rvalues/wgl-shader-boolean-literal';
import { WglShaderFloatLiteral } from '../../../rvalues/wgl-shader-float-literal';
import { WglShaderIntegerLiteral } from '../../../rvalues/wgl-shader-integer-literal';
import { WglShaderMatrixLiteral } from '../../../rvalues/wgl-shader-matrix-literal';
import { WglShaderVectorLiteral } from '../../../rvalues/wgl-shader-vector-literal';
import { WglShaderLiteralSamples } from '../../../../../testing/wgl-shader-literal-samples';
import { WglShaderVoidType } from '../../../types/wgl-shader-void-type';

describe(WglShaderBitwiseXorVisitorDispatcher.name, () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            WglShaderBitwiseXorVisitorDispatcher
        ]
    }));

    let vd: WglShaderBitwiseXorVisitorDispatcher;
    let s: WglShaderLiteralSamples;
    let voidT: WglShaderVoidType;

    beforeEach(inject([WglShaderBitwiseXorVisitorDispatcher], (injVd) => {
        vd = injVd;
        s = new WglShaderLiteralSamples();
        voidT = new WglShaderVoidType();
    }));

    it('should be created', () => {
        expect(vd).toBeTruthy();
    });

    it('should accept the operation between types for which it can be applied', () => {
        vd.visit(s.bTrue.type, s.bTrue.type);
        vd.visit(s.bTrue.type, s.fPi.type);
        vd.visit(s.bTrue.type, s.iNeg.type);

        vd.visit(s.fPi.type, s.bTrue.type);
        vd.visit(s.fPi.type, s.fPi.type);
        vd.visit(s.fPi.type, s.iNeg.type);

        vd.visit(s.iNeg.type, s.bTrue.type);
        vd.visit(s.iNeg.type, s.fPi.type);
        vd.visit(s.iNeg.type, s.iNeg.type);
    });

    it('should refuse the operation between types for which it cannot be applied', () => {
        expect(() => vd.visit(s.bTrue.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.bTrue.type, s.v3.type)).toThrow();
        expect(() => vd.visit(s.bTrue.type, voidT)).toThrow();

        expect(() => vd.visit(s.fPi.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.fPi.type, s.v3.type)).toThrow();
        expect(() => vd.visit(s.fPi.type, voidT)).toThrow();

        expect(() => vd.visit(s.iNeg.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.iNeg.type, s.v3.type)).toThrow();
        expect(() => vd.visit(s.iNeg.type, voidT)).toThrow();

        expect(() => vd.visit(s.m3.type, s.bTrue.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.fPi.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.iNeg.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.v3.type)).toThrow();
        expect(() => vd.visit(s.m3.type, voidT)).toThrow();

        expect(() => vd.visit(s.v3.type, s.bTrue.type)).toThrow();
        expect(() => vd.visit(s.v3.type, s.fPi.type)).toThrow();
        expect(() => vd.visit(s.v3.type, s.iNeg.type)).toThrow();
        expect(() => vd.visit(s.v3.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.v3.type, s.v3.type)).toThrow();
        expect(() => vd.visit(s.v3.type, voidT)).toThrow();

        expect(() => vd.visit(voidT, s.bTrue.type)).toThrow();
        expect(() => vd.visit(voidT, s.fPi.type)).toThrow();
        expect(() => vd.visit(voidT, s.iNeg.type)).toThrow();
        expect(() => vd.visit(voidT, s.m3.type)).toThrow();
        expect(() => vd.visit(voidT, s.v4.type)).toThrow();
        expect(() => vd.visit(voidT, voidT)).toThrow();
    });

});
