import { WglShaderIntegerLiteral } from './wgl-shader-integer-literal';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';

describe('WglShaderIntegerLiteral', () => {

    let integer10: WglShaderIntegerLiteral;

    beforeEach(() => {
        integer10  = new WglShaderIntegerLiteral(10);
    });

    it('should be created', () => {
        expect(integer10).toBeTruthy();
        expect(integer10.type).toEqual(new WglShaderIntegerType());
        expect(integer10.value).toEqual(10);

        const i1  = new WglShaderIntegerLiteral(Math.PI);
        expect(i1).toBeTruthy();
        expect(i1.type).toEqual(new WglShaderIntegerType());
        expect(i1.value).toEqual(3);

        const i2 = new WglShaderIntegerLiteral(-2.01);
        expect(i2).toBeTruthy();
        expect(i2.type).toEqual(new WglShaderIntegerType());
        expect(i2.value).toEqual(-3);
    });

    describe('parse', () => {

        it('should work correctly', () => {
            expect(integer10.parse()).toEqual('10');
            expect(new WglShaderIntegerLiteral(-3.14).parse()).toEqual('-4');
        });

    });

});
