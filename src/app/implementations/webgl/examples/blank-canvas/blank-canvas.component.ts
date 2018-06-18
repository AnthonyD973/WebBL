import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-blank-canvas',
    templateUrl: './blank-canvas.component.html',
    styleUrls: ['./blank-canvas.component.css']
})
export class BlankCanvasComponent {

    @ViewChild('myCanvas') public myCanvas: ElementRef;

    constructor() { }

}
