import { TestBed, inject } from '@angular/core/testing';
import { WglShaderLocalScope } from './wgl-shader-local-scope';
import { WglShaderTestingLocalScope } from '../../testing/scopes/wgl-shader-testing-local-scope';

describe(WglShaderLocalScope.name, () => {

    let scope: WglShaderLocalScope;
    let parent: WglShaderLocalScope;
    let child: WglShaderLocalScope;

    beforeEach(() => {
        parent = new WglShaderTestingLocalScope(null);
        scope = new WglShaderTestingLocalScope(parent);
        child = new WglShaderTestingLocalScope(scope);
    });

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.parent).toBe(parent);
        expect(scope.child).toBe(child);
        expect(scope.scopeName).toBeTruthy();
    });

    describe('parse', () => {

        xit('should parse the scope', () => {
            // TODO
        });

    });

    describe('if', () => {

        xit('should create a sub-scope', () => {
            // TODO
        });

    });

    describe('for', () => {

        xit('should create a sub-scope', () => {
            // TODO
        });

    });

    describe('while', () => {

        xit('should create a sub-scope', () => {
            // TODO
        });

    });

    describe('end', () => {

        xit('should create a sub-scope', () => {
            // TODO
        });

    });

});
