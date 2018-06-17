import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SceneRenderer } from '../../../../scene-renderer';
import { WebBLRenderingContext } from '../../../../api/rendering-context/webbl-rendering-context';
import { WglShaderVoidType } from '../../shaders/source/expression/types/wgl-shader-void-type';
import { WglShaderStatement } from '../../shaders/source/statement/wgl-shader-statement';
import { WglShaderAssignment } from '../../shaders/source/expression/operators/binary/wgl-shader-assignment';
import { WglShaderVariable } from '../../shaders/source/expression/lvalues/wgl-shader-variable';
import { WglShaderVectorType } from '../../shaders/source/expression/types/wgl-shader-vector-type';
import { WglShaderVectorLiteral } from '../../shaders/source/expression/rvalues/wgl-shader-vector-literal';
import { WglShaderLValueNameParser } from '../../shaders/source/expression/lvalues/lvalue-parsers/wgl-shader-l-value-name-parser';
import { mat4 } from 'gl-matrix';
import { WebBLRenderingContextForWebGL } from '../../rendering-context.ts/webbl-rendering-context-for-webgl';
import { WglShaderMatrixType } from '../../shaders/source/expression/types/wgl-shader-matrix-type';
import { WglShaderMultiply } from '../../shaders/source/expression/operators/binary/wgl-shader-multiply';

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
