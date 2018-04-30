import { Visitor } from './visitor';
import { Visitee } from './visitee';

export type Operation<T> = ((v1: Visitee<number>, v2: Visitee<number>) => T);

export class VisitorDispatcher
    <
        Ret,
        V1 extends Visitee<number>,
        V2 extends Visitee<number>,
        V1Visitor extends Visitor<number, V1>,
        V2Visitor extends Visitor<number, V2>
    > {

    protected readonly operationName: string;
    private operations: Operation<Ret>[][];
    private v1Visitor: V1Visitor;
    private v2Visitor: V2Visitor;

    public constructor(operationName: string, operations: Operation<Ret>[][], v1Visitor: V1Visitor, v2Visitor: V2Visitor) {
        this.operationName = operationName;
        this.operations = operations;
        this.v1Visitor = v1Visitor;
        this.v2Visitor = v2Visitor;
        console.log(v1Visitor, v2Visitor);
    }

    public visit(v1: V1, v2: V2): Ret {
        const v1ClassNumber = v1.acceptVisitor(this.v1Visitor);
        const v2ClassNumber = v2.acceptVisitor(this.v2Visitor);
        const v1Operations = this.operations[v1ClassNumber];
        if (v1Operations) {
            const operation = v1Operations[v2ClassNumber];
            if (operation) {
                return operation(v1, v2);
            }
            else {
                throw new Error(this.noOperationErrorMessage(v1ClassNumber, v2ClassNumber));
            }
        }
        else {
            throw new Error(this.noOperationErrorMessage(v1ClassNumber, v2ClassNumber));
        }
    }

    private noOperationErrorMessage(v1ClassNumber: number, v2ClassNumber: number): string {
        return `Operation "${this.operationName}" does not make sense between ` +
            `classes of class number ${v1ClassNumber} and ${v2ClassNumber}`;
    }
}
