import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { mat4 } from 'gl-matrix';
import { WglShaderVoidType } from '../../../shaders/source/expression/types/wgl-shader-void-type';
import { WglShaderStatement } from '../../../shaders/source/statement/wgl-shader-statement';
import { WglShaderAssignment } from '../../../shaders/source/expression/operators/binary/wgl-shader-assignment';
import { WglShaderVariable } from '../../../shaders/source/expression/lvalues/wgl-shader-variable';
import { WglShaderVectorType } from '../../../shaders/source/expression/types/wgl-shader-vector-type';
import { WglShaderVectorLiteral } from '../../../shaders/source/expression/rvalues/wgl-shader-vector-literal';
import { WglShaderLValueNameParser } from '../../../shaders/source/expression/lvalues/lvalue-parsers/wgl-shader-l-value-name-parser';
import { WebBLRenderingContextForWebGL } from '../../../rendering-context.ts/webbl-rendering-context-for-webgl';
import { WglShaderMatrixType } from '../../../shaders/source/expression/types/wgl-shader-matrix-type';
import { WglShaderMultiply } from '../../../shaders/source/expression/operators/binary/wgl-shader-multiply';

//////////////////////////////////////////////////////
// This component is based off this MDN tutorial:
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
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
        const bL = this.myCanvas.nativeElement.getContext('webbl-webgl');


        //
        // Start here
        //
        function main(bl: WebBLRenderingContextForWebGL) {


            // Vertex shader program
            const vertexShader = bl.createVertexShader();
            vertexShader.globalScope.createInput('aVertexPosition', new WglShaderVectorType(4));
            vertexShader.globalScope.createUniform('uModelViewMatrix', new WglShaderMatrixType(4, 4));
            vertexShader.globalScope.createUniform('uProjectionMatrix', new WglShaderMatrixType(4, 4));
            const vsMain = vertexShader.globalScope.createFunction('main', [], new WglShaderVoidType());
            vsMain.codeBlock.statements.push(
                new WglShaderStatement(new WglShaderAssignment(new WglShaderVariable('gl_Position', new WglShaderMatrixType(4, 4)),
                    new WglShaderMultiply(
                        new WglShaderLValueNameParser(new WglShaderVariable('uProjectionMatrix', new WglShaderMatrixType(4, 4))),
                        new WglShaderMultiply(
                            new WglShaderLValueNameParser(new WglShaderVariable('uModelViewMatrix', new WglShaderMatrixType(4, 4))),
                            new WglShaderLValueNameParser(new WglShaderVariable('aVertexPosition', new WglShaderVectorType(4)))
                        )
                    )
                ))
            );

            const vsSource = vertexShader.parse();

            // Fragment shader program
            const fragmentShader = bl.createFragmentShader();
            const fsMain = fragmentShader.globalScope.createFunction('main', [], new WglShaderVoidType());
            fsMain.codeBlock.statements.push(new WglShaderStatement(
                new WglShaderAssignment(
                    new WglShaderVariable('gl_FragColor', new WglShaderVectorType(4)),
                    new WglShaderVectorLiteral(1.0, 0.5, 0.0, 0.5)
                )
            ));
            const fsSource = fragmentShader.parse();
            console.log('fs src: \n', fsSource);

            // Initialize a shader program; this is where all the lighting
            // for the vertices and so forth is established.
            const shaderProgram = bl.createShaderProgram(vertexShader, fragmentShader);
            shaderProgram.end();

            // Collect all the info needed to use the shader program.
            // Look up which attribute our shader program is using
            // for aVertexPosition and look up uniform locations.
            const programInfo = {
                program: shaderProgram['glProgram'],
                attribLocations: {
                    vertexPosition: bl['gl'].getAttribLocation(shaderProgram['glProgram'], 'aVertexPosition'),
                },
                uniformLocations: {
                    projectionMatrix: bl['gl'].getUniformLocation(shaderProgram['glProgram'], 'uProjectionMatrix'),
                    modelViewMatrix: bl['gl'].getUniformLocation(shaderProgram['glProgram'], 'uModelViewMatrix'),
                },
            };

            // Here's where we call the routine that builds all the
            // objects we'll be drawing.
            const buffers = initBuffers(bl);

            // Draw the scene
            drawScene(bl, programInfo, buffers);
        }

        //
        // initBuffers
        //
        // Initialize the buffers we'll need. For this demo, we just
        // have one object -- a simple two-dimensional square.
        //
        function initBuffers(bl: WebBLRenderingContextForWebGL) {

            // Create a buffer for the square's positions.

            const positionBuffer = bl['gl'].createBuffer();

            // Select the positionBuffer as the one to apply buffer
            // operations to from here out.

            bl['gl'].bindBuffer(bl['gl'].ARRAY_BUFFER, positionBuffer);

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

            bl['gl'].bufferData(bl['gl'].ARRAY_BUFFER,
                new Float32Array(positions),
                bl['gl'].STATIC_DRAW);

            return {
                position: positionBuffer
            };
        }

        //
        // Draw the scene.
        //
        function drawScene(bl: WebBLRenderingContextForWebGL, programInfo, buffers) {
            bl['gl'].clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
            bl['gl'].clearDepth(1.0);                 // Clear everything
            bl['gl'].enable(bl['gl'].DEPTH_TEST);           // Enable depth testing
            bl['gl'].depthFunc(bl['gl'].LEQUAL);            // Near things obscure far things

            bl['gl'].enable(bl['gl'].BLEND);
            bl['gl'].blendFunc(bl['gl'].SRC_ALPHA, bl['gl'].ONE_MINUS_SRC_ALPHA);

            // Clear the canvas before we start drawing on it.

            // tslint:disable-next-line:no-bitwise
            bl['gl'].clear(bl['gl'].COLOR_BUFFER_BIT | bl['gl'].DEPTH_BUFFER_BIT);

            // Create a perspective matrix, a special matrix that is
            // used to simulate the distortion of perspective in a camera.
            // Our field of view is 45 degrees, with a width/height
            // ratio that matches the display size of the canvas
            // and we only want to see objects between 0.1 units
            // and 100 units away from the camera.

            const fieldOfView = 45 * Math.PI / 180;   // in radians
            const aspect = bl['gl'].canvas.clientWidth / bl['gl'].canvas.clientHeight;
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
                const type = bl['gl'].FLOAT;
                const normalize = false;
                const stride = 0;
                const offset = 0;
                bl['gl'].bindBuffer(bl['gl'].ARRAY_BUFFER, buffers.position);
                bl['gl'].vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
                bl['gl'].enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);
            }

            // Tell WebGL to use our program when drawing

            bl['gl'].useProgram(programInfo.program);

            // Set the shader uniforms

            bl['gl'].uniformMatrix4fv(
                programInfo.uniformLocations.projectionMatrix,
                false,
                projectionMatrix);
            bl['gl'].uniformMatrix4fv(
                programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix);

            {
                const offset = 0;
                const vertexCount = 4;
                bl['gl'].drawArrays(bl['gl'].TRIANGLE_STRIP, offset, vertexCount);
            }
        }

        main(bL);

    }

}

