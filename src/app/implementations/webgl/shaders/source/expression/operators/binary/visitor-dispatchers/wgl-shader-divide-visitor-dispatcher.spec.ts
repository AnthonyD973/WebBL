import { TestBed, inject } from '@angular/core/testing';
import { WglShaderDivideVisitorDispatcher } from './wgl-shader-divide-visitor-dispatcher';
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

describe(WglShaderDivideVisitorDispatcher.name, () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            WglShaderDivideVisitorDispatcher
        ]
    }));

    let vd: WglShaderDivideVisitorDispatcher;
    let s: WglShaderLiteralSamples;

    beforeEach(inject([WglShaderDivideVisitorDispatcher], (injVd) => {
        vd = injVd;
        s = new WglShaderLiteralSamples();
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

        vd.visit(s.m32.type, s.bTrue.type);
        vd.visit(s.m32.type, s.fPi.type);
        vd.visit(s.m32.type, s.iNeg.type);

        vd.visit(s.v2.type, s.v2.type);
        vd.visit(s.v3.type, s.v3.type);
        vd.visit(s.v3.type, s.bTrue.type);
        vd.visit(s.v3.type, s.fPi.type);
        vd.visit(s.v3.type, s.iNeg.type);
    });

    it('should refuse the operation between types for which it cannot be applied', () => {
        expect(() => vd.visit(s.bTrue.type, s.m23.type)).toThrow();
        expect(() => vd.visit(s.bTrue.type, s.v2.type)).toThrow();

        expect(() => vd.visit(s.fPi.type, s.m23.type)).toThrow();
        expect(() => vd.visit(s.fPi.type, s.v2.type)).toThrow();

        expect(() => vd.visit(s.iNeg.type, s.m23.type)).toThrow();
        expect(() => vd.visit(s.iNeg.type, s.v2.type)).toThrow();

        expect(() => vd.visit(s.m23.type, s.m32.type)).toThrow();
        expect(() => vd.visit(s.m23.type, s.m23.type)).toThrow();
        expect(() => vd.visit(s.m23.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.m32.type, s.m32.type)).toThrow();
        expect(() => vd.visit(s.m32.type, s.m23.type)).toThrow();
        expect(() => vd.visit(s.m32.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.m32.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.m23.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.m3.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.v2.type)).toThrow();
        expect(() => vd.visit(s.m3.type, s.v3.type)).toThrow();

        expect(() => vd.visit(s.v2.type, s.v3.type)).toThrow();
        expect(() => vd.visit(s.v2.type, s.m23.type)).toThrow();
        expect(() => vd.visit(s.v3.type, s.v2.type)).toThrow();
        expect(() => vd.visit(s.v3.type, s.m23.type)).toThrow();
    });

});
