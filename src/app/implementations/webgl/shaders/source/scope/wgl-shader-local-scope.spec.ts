import { TestBed, inject } from '@angular/core/testing';
import { WglShaderLocalScope } from './wgl-shader-local-scope';
import { WglShaderTestingLocalScope } from '../../testing/scopes/wgl-shader-testing-local-scope';

describe(WglShaderLocalScope.name, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: WglShaderLocalScope, useClass: WglShaderTestingLocalScope}
            ]
        });
    });

    let scope: WglShaderLocalScope;

    beforeEach(inject([WglShaderLocalScope], (injScope: WglShaderLocalScope) => {
        scope = injScope;
    }));

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.parent).toBeTruthy();
        expect(scope.scopeName).toBeTruthy();
    });

    describe('parse', () => {

        it('should parse the scope', () => {
            // TODO
        });

    });

    describe('if', () => {

        it('should create a sub-scope', () => {
            // TODO
        });

    });

    describe('for', () => {

        it('should create a sub-scope', () => {
            // TODO
        });

    });

    describe('while', () => {

        it('should create a sub-scope', () => {
            // TODO
        });

    });

    describe('end', () => {

        it('should create a sub-scope', () => {
            // TODO
        });

    });

});
