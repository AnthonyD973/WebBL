import { TestBed, inject } from '@angular/core/testing';

import { Stack } from './stack';

describe('Stack', () => {

    let stack: Stack<number>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Stack
            ]
        });
    });

    beforeEach(inject([Stack], (injectedStack) => {
        stack = injectedStack;
    }));

    it('should be created', () => {
        expect(stack).toBeTruthy();
        expect(stack.length).toEqual(0);
    });

    describe('push', () => {
        it('should push values on the stack', () => {
            stack.push(0);
            expect(stack.length).toEqual(1);
        });
    });

    describe('pop', () => {
        it('should pop values from the stack', () => {
            stack.push(0);
            expect(stack.pop()).toEqual(0);
            expect(stack.length).toEqual(0);
        });

        it('should throw an error if the stack is empty', () => {
            expect(() => stack.pop()).toThrow();
        });
    });

    describe('top', () => {
        it('should return the stack-top value.', () => {
            stack.push(42);
            expect(stack.top()).toEqual(42);
            expect(stack.length).toEqual(1);
        });

        it('should throw an error if the stack is empty', () => {
            expect(() => stack.top()).toThrow();
        });
    });

});
