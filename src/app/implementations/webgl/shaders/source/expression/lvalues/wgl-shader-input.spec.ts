import { WglShaderInput } from './wgl-shader-input';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';

class TestingInput extends WglShaderInput {

    public parse(): string {
        return '';
    }

}

describe(WglShaderInput.name, () => {

    let name: string;
    let type: ShaderExpressionType;
    let input: WglShaderInput;

    beforeEach(() => {
        name = 'foo';
        type = new WglShaderIntegerType();
        input = new TestingInput(name, type);
    });

    it('should be created', () => {
        expect(input).toBeTruthy();
        expect(input.name).toEqual(name);
        expect(input.type).toEqual(type);
    });

    describe('isReadable', () => {

        it('should return true', () => {
            expect(input.isReadable()).toBe(true);
        });

    });

    describe('isWritable', () => {

        it('should return false', () => {
            expect(input.isWritable()).toBe(false);
        });

    });

});
