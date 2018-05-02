import { ShaderBlock } from '../../../../../api/shaders/source/statement/shader-block';
import { ShaderAbstractStatement } from '../../../../../api/shaders/source/statement/shader-abstract-statement';
import { WglShaderLocalScope } from '../scope/wgl-shader-local-scope';

export class WglShaderBlock extends WglShaderLocalScope implements ShaderBlock {

    public statements: ShaderAbstractStatement[];

    public get scopeName(): string {
        return 'block';
    }

    constructor(parent: WglShaderLocalScope, statements: ShaderAbstractStatement[]) {
        super(parent);
        this.statements = statements;
    }

    public parse(): string {
        const parsedStatements = this.statements.reduce((acc, statement) => {
            return acc + statement.parse() + '\n';
        }, '');
        return '{\n' + parsedStatements + '}';
    }

}
