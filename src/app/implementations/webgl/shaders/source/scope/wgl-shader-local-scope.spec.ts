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
