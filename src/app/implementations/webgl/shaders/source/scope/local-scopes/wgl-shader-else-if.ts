import { WglShaderIf } from './wgl-shader-if';
import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { ShaderScopeNames } from '../../../../../../api/shaders/source/scope/shader-scope-names';

const TOKEN = 'else if';

export class WglShaderElseIf extends WglShaderIf {

    public get scopeName(): string {
        return ShaderScopeNames.elseIf;
    }

    constructor(parentIf: ShaderIf, condition: ShaderExpression) {
        super(condition);
        parentIf.parent.addChild(this);
    }

    public parse(): string {
        let parsedStatement = TOKEN + ' (' + this.condition.parse() + ') ';
        this.children.forEach(child => parsedStatement = parsedStatement + child.parse());
        return parsedStatement;
    }

    public addChild(c: ShaderLocalScope): void {
        if (this.children.length === 0) {
            super.addChild(c);
        }
        else {
            throw new Error(`Cannot add a child to a "${this.scopeName}" scope`);
        }
    }

}
