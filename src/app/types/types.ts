export type Participante = { name: string, isWinner: boolean };

export type Participantes = Participante[];

export type Jugador = { name: string, isWinner: boolean };

export type Finalista = [Participante, Participante] | [null, null];


/**
 * ROUNDS TYPE
 */

export const CUARTOS = 'CUARTOS';
export const SEMIFINAL = 'SEMIFINAL';
export const FINAL = 'FINAL';