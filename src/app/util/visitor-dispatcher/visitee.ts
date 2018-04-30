import { Visitor } from './visitor';

export interface Visitee<Ret> {
    acceptVisitor(v: Visitor<Ret, Visitee<Ret>>): Ret;
}
