import { Component, ViewChild, ElementRef } from '@angular/core';
import { SceneRenderer } from '../../../../scene-renderer';

@Component({
    selector: 'app-black-canvas',
    templateUrl: './black-canvas.component.html',
    styleUrls: ['./black-canvas.component.css']
})
export class BlackCanvasComponent {

    @ViewChild('myCanvas') public myCanvas: ElementRef;

    constructor() { }

}
