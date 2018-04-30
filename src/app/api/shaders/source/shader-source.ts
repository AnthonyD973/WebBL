export interface RawShaderSourceData {

    inputs: string[];
    outputs: string[];

}

export interface ShaderSource {

    /**
     * Get the shader's internal source. This should be used for debugging only.
     */
    getInternalSource(): any;

}
