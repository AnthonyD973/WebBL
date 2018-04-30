import { ShaderParsable } from '../shader-parsable';
import { Visitee } from '../../../../util/visitor-dispatcher/visitee';

export interface ShaderExpressionType extends Visitee<number>, ShaderParsable {

}
