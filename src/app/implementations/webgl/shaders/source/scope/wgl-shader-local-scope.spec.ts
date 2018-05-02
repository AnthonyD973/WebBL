import { TestBed, inject } from '@angular/core/testing';
import { WglShaderLocalScope } from './wgl-shader-local-scope';
import { WglShaderTestingLocalScope } from '../../testing/scopes/wgl-shader-testing-local-scope';

describe(WglShaderLocalScope.name, () => {

    let scope: WglShaderLocalScope;
    let parent: WglShaderLocalScope;
    let children: WglShaderLocalScope[];

    beforeEach(() => {
        parent = new WglShaderTestingLocalScope();
        scope = new WglShaderTestingLocalScope();
        children = [new WglShaderTestingLocalScope()];
        parent.addChild(scope);
        scope.addChild(children[0]);
    });

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.parent).toBe(parent);
        expect(scope.children).toEqual(children);
        expect(scope.scopeName).toBeTruthy();

        expect(new WglShaderTestingLocalScope().children).toBeTruthy();
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

    describe('addChild', () => {

        it('should set both the parent and the child if possible', () => {
            const p = new WglShaderTestingLocalScope();
            const c = new WglShaderTestingLocalScope();
            p.addChild(c);
            expect(p.children).toEqual([c]);
            expect(c.parent).toBe(p);
        });

        it('should throw and have no side effect if the child already has a parent', () => {
            const p = new WglShaderTestingLocalScope();
            const otherP = new WglShaderTestingLocalScope();
            const c = new WglShaderTestingLocalScope();

            otherP.addChild(c);
            const cInit = p.children;
            const pInit = c.parent;

            expect(() => p.addChild(c)).toThrow();
            expect(p.children).toBe(cInit);
            expect(c.parent).toBe(pInit);
        });

    });

    describe('setParent', () => {

        it('should set its parent', () => {
            const p = new WglShaderTestingLocalScope();
            const c = new WglShaderTestingLocalScope();
            c.setParent(p);
            expect(c.parent).toBe(p);
        });

        it('should throw an error if there already is a parent', () => {
            const c = new WglShaderTestingLocalScope();
            c.setParent(new WglShaderTestingLocalScope());
            expect(() => c.setParent(new WglShaderTestingLocalScope())).toThrow();
        });

    });

});
