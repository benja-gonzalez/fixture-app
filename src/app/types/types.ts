export type Participante = { name: string, isWinner: boolean, id:number };

export type Participantes = Participante[];

export type Finalista = [Participante, Participante] | [null, null];


/**
 * ROUNDS TYPE
 */

export const CUARTOS = 'CUARTOS';
export const SEMIFINAL = 'SEMIFINAL';
export const FINAL = 'FINAL';
export const OCTAVOS = 'OCTAVOS';