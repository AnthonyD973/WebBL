import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//////////////////////////////////////////////////////
// This component is based off this MDN tutorial:
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL
//
// Tutorial by Mozilla Contributors and licensed under CC-BY-SA 2.5.
/////////////////////////////////////////////////////

@Component({
    selector: 'app-getting-started',
    templateUrl: './getting-started.component.html',
    styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {

    @ViewChild('myCanvas') public myCanvas: ElementRef;

    constructor() { }

    public ngOnInit() {
        // Initialize the GL context
        const bl = this.myCanvas.nativeElement.getContext('webbl-webgl');

        // Only continue if WebGL is available and working
        /* Nothing to do for WebBL: Getting the context throws an error if something is wrong */

        // Set clear color to black, fully opaque
        bl['gl'].clearColor(0.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        bl['gl'].clear(bl['gl'].COLOR_BUFFER_BIT);
    }

}

