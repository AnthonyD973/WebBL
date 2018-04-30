import { TestBed, inject } from '@angular/core/testing';

import { VisitorDispatcher, Operation } from './visitor-dispatcher';
import { Visitee } from './visitee';
import { Visitor } from './visitor';

abstract class V1 implements Visitee<number> {
    public classNumber: number;
    public abstract acceptVisitor(visitor: Visitor<number, V1>): number;
}

class V10 extends V1 {
    public classNumber = 0;
    public acceptVisitor(visitor: AbstractV1Visitor): number {
        return visitor.visit0(this);
    }
}

class V11 extends V1 {
    public classNumber = 1;
    public acceptVisitor(visitor: AbstractV1Visitor): number {
        return visitor.visit1(this);
    }
}

class V12 extends V1 {
    public classNumber = 2;
    public acceptVisitor(visitor: AbstractV1Visitor): number {
        return visitor.visit2(this);
    }
}

abstract class V2 implements Visitee<number> {
    public classNumber: number;
    public abstract acceptVisitor(visitor: Visitor<number, V2>);
}

class V20 extends V2 {
    public classNumber = 0;
    public acceptVisitor(visitor: AbstractV2Visitor): number {
        return visitor.visit0(this);
    }
}

class V21 extends V2 {
    public classNumber = 1;
    public acceptVisitor(visitor: AbstractV2Visitor): number {
        return visitor.visit1(this);
    }
}

class V22 extends V2 {
    public classNumber = 2;
    public acceptVisitor(visitor: AbstractV2Visitor): number {
        return visitor.visit2(this);
    }
}

abstract class AbstractV1Visitor implements Visitor<number, V1> {
    public abstract visit0(visitee: Visitee<number>): number;
    public abstract visit1(visitee: Visitee<number>): number;
    public abstract visit2(visitee: Visitee<number>): number;
}

abstract class AbstractV2Visitor implements Visitor<number, V2> {
    public abstract visit0(visitee: Visitee<number>): number;
    public abstract visit1(visitee: Visitee<number>): number;
    public abstract visit2(visitee: Visitee<number>): number;
}

class V1Visitor extends AbstractV1Visitor {
    public visit0(visitee: Visitee<number>): number { return 0; }
    public visit1(visitee: Visitee<number>): number { return 1; }
    public visit2(visitee: Visitee<number>): number { return 2; }
}

class V2Visitor extends AbstractV2Visitor {
    public visit0(visitee: Visitee<number>): number { return 0; }
    public visit1(visitee: Visitee<number>): number { return 1; }
    public visit2(visitee: Visitee<number>): number { return 2; }
}

function operationFactory(v1ClassNumber: number, v2ClassNumber: number): Operation<string> {
    return (v1: V1, v2: V2) => `V1${v1ClassNumber}+V2${v2ClassNumber}`;
}

describe('VisitorDispatcher', () => {

    let vd: VisitorDispatcher<string, V1, V2, AbstractV1Visitor, AbstractV2Visitor>;
    let v1Objects: V1[];
    let v2Objects: V2[];
    let v1v: V1Visitor;
    let v2v: V2Visitor;

    beforeEach(() => {
        v1Objects = [new V10(), new V11(), new V12()];
        v2Objects = [new V20(), new V21(), new V22()];
        v1v = new V1Visitor();
        v2v = new V2Visitor();

        // Create visitor dispatcher
        const operations: Operation<string>[][] =
            v1Objects.map(v1 => v2Objects.map(v2 => operationFactory(v1.classNumber, v2.classNumber)));
        vd  = new VisitorDispatcher('testOperation', operations, v1v, v2v);
    });

    it('should be created', () => {
        expect(vd).toBeTruthy();
    });

    it('should call the correct operation depending on the concrete type of both objects', () => {
        v1Objects.forEach((v1, v1ClassNumber) => {
            v2Objects.forEach((v2, v2ClassNumber) => {
                const target = operationFactory(v1.classNumber, v2.classNumber)(v1, v2);
                expect(vd.visit(v1, v2)).toEqual(target);
            });
        });
    });

});
