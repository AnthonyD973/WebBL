import { TestBed, inject } from '@angular/core/testing';
import { WglShaderEmptyLocalScope } from './wgl-shader-empty-local-scope';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { WglShaderTestingExpression } from '../../../testing/wgl-shader-testing-expression';
import { WglShaderTestingExpressionType } from '../../../testing/wgl-shader-testing-expression-type';

describe(WglShaderEmptyLocalScope.name, () => {

    let parent: WglShaderTestingLocalScope;
    let scope: WglShaderEmptyLocalScope;
    let expr: WglShaderTestingExpression;

    beforeEach(() => {
        parent = new WglShaderTestingLocalScope();
        scope = new WglShaderEmptyLocalScope();
        parent.addChild(scope);
        expr = new WglShaderTestingExpression(new WglShaderTestingExpressionType('test_t'), '');
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

    describe('end', () => {

        it('should throw an error', () => {
            expect(() => scope.end()).toThrow();
        });

    });

    describe('if', () => {

        it('should throw an error', () => {
            expect(() => scope.if(expr)).toThrow();
        });

    });

    describe('for', () => {

        it('should throw an error', () => {
            expect(() => scope.for(expr, expr, expr)).toThrow();
        });

    });

    describe('while', () => {

        it('should throw an error', () => {
            expect(() => scope.while(expr)).toThrow();
        });

    });

    describe('addChild', () => {

        it('should throw an error', () => {
            expect(() => scope.addChild(new WglShaderTestingLocalScope())).toThrow();
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
