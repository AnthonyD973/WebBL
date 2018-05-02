import { TestBed, inject } from '@angular/core/testing';
import { WglShaderEmptyLocalScope } from './wgl-shader-empty-local-scope';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';

describe(WglShaderEmptyLocalScope.name, () => {

    let parent: WglShaderTestingLocalScope;
    let scope: WglShaderEmptyLocalScope;

    beforeEach(() => {
        parent = new WglShaderTestingLocalScope();
        scope = new WglShaderEmptyLocalScope();
        parent.makeParentOf(scope);
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
