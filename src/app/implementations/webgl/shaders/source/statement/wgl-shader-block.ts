import { ShaderBlock } from '../../../../../api/shaders/source/statement/shader-block';
import { ShaderAbstractStatement } from '../../../../../api/shaders/source/statement/shader-abstract-statement';

export class WglShaderBlock implements ShaderBlock {

    public statements: ShaderAbstractStatement[];

    constructor(expressions: ShaderAbstractStatement[]) {
        this.statements = expressions;
    }

    public parse(): string {
        const parsedStatements = this.statements.reduce((acc, expr) => {
            return acc + expr.parse() + '\n';
        }, '');
        return '{\n' + parsedStatements + '}';
    }

}
