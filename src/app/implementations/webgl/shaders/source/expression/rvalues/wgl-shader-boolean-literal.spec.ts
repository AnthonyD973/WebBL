import { WglShaderBooleanLiteral } from './wgl-shader-boolean-literal';
import { WglShaderBooleanType } from '../types/wgl-shader-boolean-type';

describe('WglShaderBooleanLiteral', () => {

    let boolFalse: WglShaderBooleanLiteral;
    let boolTrue: WglShaderBooleanLiteral;

    beforeEach(() => {
        boolFalse = new WglShaderBooleanLiteral(false);
        boolTrue = new WglShaderBooleanLiteral(true);
    });

    it('should be created', () => {
        expect(boolFalse).toBeTruthy();
        expect(boolFalse.type).toEqual(new WglShaderBooleanType());
        expect(boolFalse.value).toEqual(false);

        expect(boolTrue).toBeTruthy();
        expect(boolTrue.type).toEqual(new WglShaderBooleanType());
        expect(boolTrue.value).toEqual(true);
    });

    describe('parse', () => {

        it('should work correctly', () => {
            expect(boolFalse.parse()).toEqual('false');
            expect(boolTrue.parse()).toEqual('true');
        });

    });

});
