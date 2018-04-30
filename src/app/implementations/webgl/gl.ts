export class Gl {

    private static contextInternal: WebGLRenderingContext;

    public static get context(): WebGLRenderingContext {
        return Gl.contextInternal;
    }

    public static set setWebGLContext(context: WebGLRenderingContext) {
        if (Gl.contextInternal === undefined) {
            Gl.contextInternal = context;
        }
        else {
            throw new Error('Cannot set context: context already set');
        }
    }

}
