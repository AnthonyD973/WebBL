import { ShaderBinaryOperator } from '../../../../../../../api/shaders/source/expression/operators/shader-binary-operator';
import { ShaderExpression } from '../../../../../../../api/shaders/source/expression/shader-expression';
import { ShaderExpressionType } from '../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderSubtractVisitorDispatcher } from './visitor-dispatchers/wgl-shader-subtract-visitor-dispatcher';

const OPERATOR = '-';

export class WglShaderSubtract implements ShaderBinaryOperator {

    public readonly lhs: ShaderExpression;
    public readonly rhs: ShaderExpression;
    public readonly type: ShaderExpressionType;

    constructor(lhs: ShaderExpression, rhs: ShaderExpression) {
        this.lhs = lhs;
        this.rhs = rhs;
        this.type = this.lhs.type;
        this.assertValid();
    }

    public parse(): string {
        return this.lhs.parse() + ' ' + OPERATOR + ' ' + this.rhs.parse();
    }

    protected assertValid(): void {
        const vd = new WglShaderSubtractVisitorDispatcher();
        vd.visit(this.lhs.type, this.rhs.type);
    }

}
