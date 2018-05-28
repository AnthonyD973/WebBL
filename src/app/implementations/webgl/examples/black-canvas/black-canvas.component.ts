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
        const bL = this.myCanvas.nativeElement.getContext('webbl-webgl');


        //
        // Start here
        //
        function main(bl: WebBLRenderingContextForWebGL) {

            // If we don't have a GL context, give up now

            if (!bl['gl']) {
                alert('Unable to initialize WebGL. Your browser or machine may not support it.');
                return;
            }

            // Vertex shader program

            const vsSource = `
      attribute vec4 aVertexPosition;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      }
    `;

            // Fragment shader program

            const fsSource = `
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `;

            // Initialize a shader program; this is where all the lighting
            // for the vertices and so forth is established.
            const shaderProgram = initShaderProgram(bl, vsSource, fsSource);

            // Collect all the info needed to use the shader program.
            // Look up which attribute our shader program is using
            // for aVertexPosition and look up uniform locations.
            const programInfo = {
                program: shaderProgram,
                attribLocations: {
                    vertexPosition: bl['gl'].getAttribLocation(shaderProgram, 'aVertexPosition'),
                },
                uniformLocations: {
                    projectionMatrix: bl['gl'].getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                    modelViewMatrix: bl['gl'].getUniformLocation(shaderProgram, 'uModelViewMatrix'),
                },
            };

            // Here's where we call the routine that builds all the
            // objects we'll be drawing.
            const buffers = initBuffers(bl['gl']);

            // Draw the scene
            drawScene(bl['gl'], programInfo, buffers);
        }

        //
        // initBuffers
        //
        // Initialize the buffers we'll need. For this demo, we just
        // have one object -- a simple two-dimensional square.
        //
        function initBuffers(gl) {

            // Create a buffer for the square's positions.

            const positionBuffer = gl.createBuffer();

            // Select the positionBuffer as the one to apply buffer
            // operations to from here out.

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            // Now create an array of positions for the square.

            const positions = [
                1.0, 1.0,
                -1.0, 1.0,
                1.0, -1.0,
                -1.0, -1.0,
            ];

            // Now pass the list of positions into WebGL to build the
            // shape. We do this by creating a Float32Array from the
            // JavaScript array, then use it to fill the current buffer.

            gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

            return {
                position: positionBuffer,
            };
        }

        //
        // Draw the scene.
        //
        function drawScene(gl, programInfo, buffers) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
            gl.clearDepth(1.0);                 // Clear everything
            gl.enable(gl.DEPTH_TEST);           // Enable depth testing
            gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

            // Clear the canvas before we start drawing on it.

            // tslint:disable-next-line:no-bitwise
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            // Create a perspective matrix, a special matrix that is
            // used to simulate the distortion of perspective in a camera.
            // Our field of view is 45 degrees, with a width/height
            // ratio that matches the display size of the canvas
            // and we only want to see objects between 0.1 units
            // and 100 units away from the camera.

            const fieldOfView = 45 * Math.PI / 180;   // in radians
            const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            const zNear = 0.1;
            const zFar = 100.0;
            const projectionMatrix = mat4.create();

            // note: glmatrix.js always has the first argument
            // as the destination to receive the result.
            mat4.perspective(projectionMatrix,
                fieldOfView,
                aspect,
                zNear,
                zFar);

            // Set the drawing position to the "identity" point, which is
            // the center of the scene.
            const modelViewMatrix = mat4.create();

            // Now move the drawing position a bit to where we want to
            // start drawing the square.

            mat4.translate(modelViewMatrix,     // destination matrix
                modelViewMatrix,     // matrix to translate
                [-0.0, 0.0, -6.0]);  // amount to translate

            // Tell WebGL how to pull out the positions from the position
            // buffer into the vertexPosition attribute.
            {
                const numComponents = 2;
                const type = gl.FLOAT;
                const normalize = false;
                const stride = 0;
                const offset = 0;
                gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
                gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
                gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);
            }

            // Tell WebGL to use our program when drawing

            gl.useProgram(programInfo.program);

            // Set the shader uniforms

            gl.uniformMatrix4fv(
                programInfo.uniformLocations.projectionMatrix,
                false,
                projectionMatrix);
            gl.uniformMatrix4fv(
                programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix);

            {
                const offset = 0;
                const vertexCount = 4;
                gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
            }
        }

        //
        // Initialize a shader program, so WebGL knows how to draw our data
        //
        function initShaderProgram(bl: WebBLRenderingContextForWebGL, vsSource: string, fsSource: string) {
            const vertexShader = loadShader(bl['gl'], bl['gl'].VERTEX_SHADER, vsSource);
            const fragmentShader = loadShader(bl['gl'], bl['gl'].FRAGMENT_SHADER, fsSource);

            // Create the shader program

            const shaderProgram = bl['gl'].createProgram();
            bl['gl'].attachShader(shaderProgram, vertexShader);
            bl['gl'].attachShader(shaderProgram, fragmentShader);
            bl['gl'].linkProgram(shaderProgram);

            // If creating the shader program failed, alert

            if (!bl['gl'].getProgramParameter(shaderProgram, bl['gl'].LINK_STATUS)) {
                alert('Unable to initialize the shader program: ' + bl['gl'].getProgramInfoLog(shaderProgram));
                return null;
            }

            return shaderProgram;
        }

        //
        // creates a shader of the given type, uploads the source and
        // compiles it.
        //
        function loadShader(gl, type, source) {
            const shader = gl.createShader(type);

            // Send the source to the shader object

            gl.shaderSource(shader, source);

            // Compile the shader program

            gl.compileShader(shader);

            // See if it compiled successfully

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }

            return shader;
        }


        main(bL);

        // const vs = bl.createVertexShader();
        // vs.globalScope.createInput('aVertexPosition', new WglShaderVectorType(4));
        // const vsMain = vs.globalScope.createFunction('main', [], new WglShaderVoidType());
        // const glPos = new WglShaderVariable('gl_Position', new WglShaderVectorType(4));
        // const inp = vs.globalScope.inputs.get('aVertexPosition');
        // vsMain.codeBlock.statements.push(
        //     new WglShaderStatement(
        //         new WglShaderAssignment(
        //             glPos,
        //             new WglShaderLValueNameParser(inp)
        //         )
        //     )
        // );

        // const fs = bl.createFragmentShader();
        // const fsMain = fs.globalScope.createFunction('main', [], new WglShaderVoidType());
        // fsMain.codeBlock.statements.push(
        //     new WglShaderStatement(
        //         new WglShaderAssignment(
        //             new WglShaderVariable('gl_FragColor', new WglShaderVectorType(4)),
        //             new WglShaderVectorLiteral(1.0, 1.0, 1.0, 1.0)
        //         )
        //     )
        // );

        // const prgm = bl.createShaderProgram(vs, fs);
        // console.log(prgm.vertexShader.parse(), '\n\n');
        // console.log(prgm.fragmentShader.parse());

        // prgm.end();

        // const positionBuffer = gl.createBuffer();

        // // Select the positionBuffer as the one to apply buffer
        // // operations to from here out.

        // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // // Now create an array of positions for the square.

        // const positions = [
        //      1.0,  1.0,
        //     -1.0,  1.0,
        //      1.0, -1.0,
        //     -1.0, -1.0,
        // ];

        // // Now pass the list of positions into WebGL to build the
        // // shape. We do this by creating a Float32Array from the
        // // JavaScript array, then use it to fill the current buffer.

        // gl.bufferData(gl.ARRAY_BUFFER,
        //     new Float32Array(positions),
        //     gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // const vertexPosition = gl.getAttribLocation(prgm['glProgram'], 'aVertexPosition');
        // gl.vertexAttribPointer(
        //     vertexPosition,
        //     2,
        //     gl.FLOAT,
        //     false,
        //     0,
        //     0
        // );
        // gl.enableVertexAttribArray(vertexPosition);

        // bl.useProgram(prgm);

        // this.sceneRenderer = new SceneRenderer(gl);
        // this.sceneRenderer.startRendering();
    }

}
