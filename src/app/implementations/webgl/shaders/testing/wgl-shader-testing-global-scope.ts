import { WglShaderGlobalScope } from '../source/scope/wgl-shader-global-scope';
import { Shader } from '../../../../api/shaders/shader';
import { WglTestingFragmentShaderValid } from './shaders/wgl-testing-fragment-shader-valid';

export class WglShaderTestingGlobalScope extends WglShaderGlobalScope {

    constructor(parent: Shader = new WglTestingFragmentShaderValid()) {
        super(parent);
    }

}
