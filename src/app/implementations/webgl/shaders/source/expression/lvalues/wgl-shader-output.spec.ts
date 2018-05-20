import { WglShaderOutput } from './wgl-shader-output';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';

class TestingOutput extends WglShaderOutput {

    public parse(): string {
        return '';
    }

}

describe(WglShaderOutput.name, () => {

    let name: string;
    let type: ShaderExpressionType;
    let output: WglShaderOutput;

    beforeEach(() => {
        name = 'foo';
        type = new WglShaderIntegerType();
        output = new TestingOutput(name, type);
    });

    it('should be created', () => {
        expect(output).toBeTruthy();
        expect(output.name).toEqual(name);
        expect(output.type).toEqual(type);
    });

    describe('isReadable', () => {

        it('should return false', () => {
            expect(output.isReadable()).toBe(false);
        });

    });

    describe('isWritable', () => {

        it('should return true', () => {
            expect(output.isWritable()).toBe(true);
        });

    });

});
