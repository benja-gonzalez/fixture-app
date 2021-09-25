import { Participantes } from "src/app/types/types";

let data: Participantes = [];

export const setData = (newData: Participantes,round?:string): void => {
    data = newData;
    localStorage.setItem('round', round ?? '');
    localStorage.setItem('data', JSON.stringify(data));
}

export const roundSaved = (): string => JSON.parse(localStorage.getItem('round') ?? '');

export const getData = (): Participantes => JSON.parse(localStorage.getItem('data') ?? '[]');
//export const getCuartos = (): Participantes => JSON.parse(localStorage.getItem())