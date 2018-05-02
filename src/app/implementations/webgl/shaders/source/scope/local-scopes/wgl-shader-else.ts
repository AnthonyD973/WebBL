import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { WglShaderBlock } from '../../statement/wgl-shader-block';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';

const TOKEN = 'else';

export class WglShaderElse extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'else';
    }

    constructor(parentIf: ShaderIf) {
        super();
        this.children.push(new WglShaderBlock());
        parentIf.parent.makeParentOf(this);
    }

    public parse(): any {
        let parsedStatement = TOKEN + ' ';
        this.children.forEach(child => parsedStatement = parsedStatement + child.parse());
        return parsedStatement;
    }

}
