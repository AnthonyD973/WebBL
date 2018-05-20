import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { WglShaderBlock } from '../../statement/wgl-shader-block';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { ShaderScopeNames } from '../../../../../../api/shaders/source/scope/shader-scope-names';

const TOKEN = 'else';

export class WglShaderElse extends WglShaderLocalScope {

    public get scopeName(): string {
        return ShaderScopeNames.else;
    }

    constructor(parentIf: ShaderIf) {
        super();
        this.children.push(new WglShaderBlock());

        // Safe cast ; an if's parent is always a local scope
        (parentIf.parent as ShaderLocalScope).addChild(this);
    }

    public parse(): any {
        let parsedStatement = TOKEN + ' ';
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
