import { WebBLRenderingContextForWebGL } from './implementations/webgl/rendering-context.ts/webbl-rendering-context-for-webgl';

let setUpAlreadyDone = false;
const WEBBL_PREFIX = 'webbl-';

export function setUpWebBl() {
    if (!setUpAlreadyDone) {
        const canvasPrototype = HTMLCanvasElement.prototype;
        const getContext = canvasPrototype.getContext;

        const webBlGetContext = function(str) {
            const webBLRegex = new RegExp(`^${WEBBL_PREFIX}.*$`);
            if (webBLRegex.test(str)) {
                // Use WebBL rendering context
                const implementation = str.match(new RegExp(`(?<=${WEBBL_PREFIX}).*`))[0];
                if (implementation === 'webgl') {
                    return new WebBLRenderingContextForWebGL(this);
                }
                else {
                    throw new Error(`Requested WebBL implementation "${implementation}" does not exist`);
                }
            }
            else {
                return getContext.bind(this)(str);
            }
        };

        canvasPrototype.getContext = webBlGetContext;
        setUpAlreadyDone = true;
    }
    else {
        console.warn('WebBL setup was called more than once. Any subsequent call will have no side-effect.');
    }
}
