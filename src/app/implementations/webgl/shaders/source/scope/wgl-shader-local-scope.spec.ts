import { TestBed, inject } from '@angular/core/testing';
import { WglShaderLocalScope } from './wgl-shader-local-scope';
import { WglShaderTestingLocalScope } from '../../testing/scopes/wgl-shader-testing-local-scope';
import { ShaderExpression } from '../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../expression/rvalues/wgl-shader-integer-literal';

describe(WglShaderLocalScope.name, () => {

    let scope: WglShaderLocalScope;
    let parent: WglShaderLocalScope;
    let child: WglShaderLocalScope;
    let init: ShaderExpression;
    let condition: ShaderExpression;
    let loop: ShaderExpression;

    beforeEach(() => {
        parent = new WglShaderTestingLocalScope();
        scope = new WglShaderTestingLocalScope();
        child = new WglShaderTestingLocalScope();
        parent.addChild(scope);
        scope.addChild(child);

        init = new WglShaderIntegerLiteral(-1);
        condition = new WglShaderIntegerLiteral(-2);
        loop = new WglShaderIntegerLiteral(-3);
    });

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.parent).toBe(parent);
        expect(scope.children).toEqual([child]);
        expect(scope.scopeName).toBeTruthy();

        expect(new WglShaderTestingLocalScope().children).toBeTruthy();
    });

    describe('if', () => {

        xit('should create a sub-scope', () => {
            const statement = scope.if(condition);
            expect(statement.parent).toBe(scope);
            expect(scope.children).toContain(statement);
            expect(statement.condition).toBe(condition);
        });

    });

    describe('for', () => {

        xit('should create a sub-scope', () => {
            const statement = scope.for(init, condition, loop);
            expect(statement.parent).toBe(scope);
            expect(scope.children).toContain(statement);
            expect(statement.condition).toBe(condition);
        });

    });

    describe('while', () => {

        xit('should create a sub-scope', () => {
            const statement = scope.while(condition);
            expect(statement.parent).toBe(scope);
            expect(scope.children).toContain(statement);
            expect(statement.condition).toBe(condition);
        });

    });

    describe('end', () => {

        it('should prevent adding statements to the scope', () => {
            scope.end();
            expect(() => scope.if(condition)).toThrow();
            expect(() => scope.for(init, condition, loop)).toThrow();
            expect(() => scope.while(condition)).toThrow();
        });

        it('should throw when called a second time', () => {
            scope.end();
            expect(() => scope.end()).toThrow();
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
