export class SceneRenderer {

    public readonly gl: WebGLRenderingContext;

    private isRendering = false;
    private animationFrameRequestId = -1;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.setupWebGl();
    }

    protected setupWebGl(): void {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    }

    public startRendering(): void {
        if (!this.isRendering) {
            const ANIMATION_FRAME_CALLBACK = () => {
                this.render();
                this.animationFrameRequestId = requestAnimationFrame(ANIMATION_FRAME_CALLBACK);
            };
            this.animationFrameRequestId = requestAnimationFrame(ANIMATION_FRAME_CALLBACK);
            this.isRendering = true;
        }
        else {
            throw new Error(`Already started rendering.`);
        }
    }

    public stopRendering(): void {
        if (this.isRendering) {
            cancelAnimationFrame(this.animationFrameRequestId);
            this.isRendering = false;
            this.animationFrameRequestId = -1;
        }
        else {
            throw new Error(`Not currently rendering.`);
        }
    }

    protected render(): void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

}
