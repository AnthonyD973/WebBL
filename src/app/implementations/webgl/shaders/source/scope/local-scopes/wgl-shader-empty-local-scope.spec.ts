import { TestBed, inject } from '@angular/core/testing';
import { WglShaderEmptyLocalScope } from './wgl-shader-empty-local-scope';

describe(WglShaderEmptyLocalScope.name, () => {

    let scope: WglShaderEmptyLocalScope;
    let parent: WglShaderEmptyLocalScope;

    beforeEach(() => {
        parent = new WglShaderEmptyLocalScope(null);
        scope = new WglShaderEmptyLocalScope(parent);
    });

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.parent).toBe(parent);
        expect(scope.scopeName).toBeTruthy();
    });

    describe('parse', () => {

        it('should be empty', () => {
            expect(scope.parse()).toEqual('');
        });

    });

});
