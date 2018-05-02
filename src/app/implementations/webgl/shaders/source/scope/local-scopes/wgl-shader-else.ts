import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

const TOKEN = 'else';

export class WglShaderElse extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'else';
    }

    constructor() {
        super();
        this.children.push(new WglShaderBlock());
    }

    public parse(): any {
        let parsedStatement = TOKEN + ' ';
        this.children.forEach(child => parsedStatement = parsedStatement + child.parse());
        return parsedStatement;
    }

}
