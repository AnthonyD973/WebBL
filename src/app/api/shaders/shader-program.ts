import { VertexShader } from './vertex-shader';
import { FragmentShader } from './fragment-shader';

interface Locations {
    attributes: {};
    uniforms: {};
}

export abstract class ShaderProgram {

    private program: WebGLProgram;

    public readonly locations: Locations = {attributes: {}, uniforms: {}};

    constructor(
            gl: WebGLRenderingContext,
            vertexShader: VertexShader,
            fragmentShader: FragmentShader,
            attributeNames: string[],
            uniformNames: string[]
        ) {
        this.createProgram(gl, vertexShader, fragmentShader);
        this.createShaderData(gl, attributeNames, uniformNames);
    }

    private createProgram(gl: WebGLRenderingContext, vertexShader: VertexShader, fragmentShader: FragmentShader): void {
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        const PROGRAM_LINKED_SUCCESSFULLY = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!PROGRAM_LINKED_SUCCESSFULLY) {
            const ERROR_MESSAGE = 'WebGL program could not be created. We apologize for the inconveniance.\n\nProgram log: ' +
                gl.getProgramInfoLog(this.program);
            alert(ERROR_MESSAGE);
            throw new Error(ERROR_MESSAGE);
        }
    }

    private createShaderData(gl: WebGLRenderingContext, attributeNames: string[], uniformNames: string[]): void {
        attributeNames.forEach((attributeName) => {
            const LOCATION = gl.getAttribLocation(this.program, attributeName);

            if (LOCATION >= 0) {
                this.locations.attributes[attributeName] = LOCATION;
            }
            else {
                console.warn('Could not find location of attribute "' + attributeName + '"');
            }
        });

        uniformNames.forEach((uniformName) => {
            const LOCATION = gl.getAttribLocation(this.program, uniformName);

            if (LOCATION >= 0) {
                this.locations.attributes[uniformName] = LOCATION;
            }
            else {
                console.warn('Could not find location of uniform "' + uniformName + '"');
            }
        });
    }

}
