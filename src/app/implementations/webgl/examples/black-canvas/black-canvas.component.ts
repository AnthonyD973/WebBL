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
        const bl: WebBLRenderingContext = this.myCanvas.nativeElement.getContext('webbl-webgl');
        const gl: WebGLRenderingContext = this.myCanvas.nativeElement.getContext('webgl');

        const vs = bl.createVertexShader();
        vs.globalScope.createInput('aVertexPosition', new WglShaderVectorType(4));
        const vsMain = vs.globalScope.createFunction('main', [], new WglShaderVoidType());
        const glPos = new WglShaderVariable('gl_Position', new WglShaderVectorType(4));
        const inp = vs.globalScope.inputs.get('aVertexPosition');
        vsMain.codeBlock.statements.push(
            new WglShaderStatement(
                new WglShaderAssignment(
                    glPos,
                    new WglShaderLValueNameParser(inp)
                )
            )
        );

        const fs = bl.createFragmentShader();
        const fsMain = fs.globalScope.createFunction('main', [], new WglShaderVoidType());
        fsMain.codeBlock.statements.push(
            new WglShaderStatement(
                new WglShaderAssignment(
                    new WglShaderVariable('gl_FragColor', new WglShaderVectorType(4)),
                    new WglShaderVectorLiteral(1.0, 1.0, 1.0, 1.0)
                )
            )
        );

        const prgm = bl.createShaderProgram(vs, fs);
        console.log(prgm.vertexShader.parse(), '\n\n');
        console.log(prgm.fragmentShader.parse());

        prgm.end();

        const positionBuffer = gl.createBuffer();

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Now create an array of positions for the square.

        const positions = [
             1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
            -1.0, -1.0,
        ];

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(positions),
            gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const vertexPosition = gl.getAttribLocation(prgm['glProgram'], 'aVertexPosition');
        gl.vertexAttribPointer(
            vertexPosition,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.enableVertexAttribArray(vertexPosition);

        bl.useProgram(prgm);

        this.sceneRenderer = new SceneRenderer(gl);
        this.sceneRenderer.startRendering();
    }

}
