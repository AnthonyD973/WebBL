let setUpAlreadyDone = false;

export function setUpWebBl() {
    if (!setUpAlreadyDone) {
        const canvasPrototype = HTMLCanvasElement.prototype;
        const getContext = canvasPrototype.getContext;
        const webBlGetContext = function(str) {
            if (str === 'webbl') {
                return null; // TODO
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
