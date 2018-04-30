import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SceneRenderer } from '../../../../scene-renderer';

@Component({
    selector: 'app-black-canvas',
    templateUrl: './black-canvas.component.html',
    styleUrls: ['./black-canvas.component.css']
})
export class BlackCanvasComponent implements OnInit {

    @ViewChild('myCanvas') public myCanvas: ElementRef;

    private sceneRenderer: SceneRenderer;

    constructor() { }

    public ngOnInit() {
        const gl: WebGLRenderingContext = this.myCanvas.nativeElement.getContext('webgl');

        this.sceneRenderer = new SceneRenderer(gl);
        this.sceneRenderer.startRendering();
    }

}
