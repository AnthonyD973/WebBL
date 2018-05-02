import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderConfig } from '../../../util/wgl-shader-config';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { ShaderFunction } from '../../../../../../api/shaders/source/scope/local-scopes/shader-function';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderArgumentListParser } from '../util/wgl-shader-argument-list-parser';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

export class WglShaderFunction extends WglShaderLocalScope implements ShaderFunction {

    public readonly name: string;
    public readonly params: WglShaderVariable[];
    public readonly ret: ShaderExpressionType;

    public get signature(): WglShaderFunctionSignature {
        const returnTypes = this.params.map(variable => variable.type);
        return new WglShaderFunctionSignature(returnTypes, this.ret);
    }

    public get scopeName(): string {
        return 'function';
    }

    constructor(name: string, params: WglShaderVariable[], ret: ShaderExpressionType) {
        super();
        if (!WglShaderConfig.IDENTIFIER_REGEX.test(name)) {
            throw new Error(`"${name}" is not a valid identifier`);
        }
        this.name = name;
        this.params = params;
        this.ret = ret;
        this.addChild(new WglShaderBlock());
    }

    public parse(): string {
        let parsedStatement = this.ret.parse() + ' ' + this.name + new WglShaderArgumentListParser().parseDeclaration(this.params) + ' ';
        this.children.forEach(child => parsedStatement = parsedStatement + child.parse());
        return parsedStatement;
    }

}
