import { TestBed, inject } from '@angular/core/testing';
import { WglShaderGlobalScope } from './wgl-shader-global-scope';

describe(WglShaderGlobalScope.name, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WglShaderGlobalScope
            ]
        });
    });

    let scope: WglShaderGlobalScope;

    beforeEach(inject([WglShaderGlobalScope], (injScope: WglShaderGlobalScope) => {
        scope = injScope;
    }));

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.functions).toBeTruthy();
        expect(scope.inputs).toBeTruthy();
        expect(scope.outputs).toBeTruthy();
    });

    xit('should be able to create functions', () => {
        // TODO
    });

    xit('should be able to create inputs', () => {
        // TODO
    });

    xit('should be able to create outputs', () => {
        // TODO
    });

});
