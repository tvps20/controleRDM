import { Horario } from "~/shared/models/horario.model";

export class Disciplina {
    public id: number;
    public nome: string;
    public professor: string;
    public cargaHoraria: number;
    public horario: Horario[];
    public isClosed: Boolean;
    public status: string;
    public primeiraNota: number;
    public segundaNota: number;
    public terceiraNota: number;
    public quartaNota: number;
    public notaFinal: number;

    constructor (nome: string, cargaHoraria: number){
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.isClosed = false;
    }
}
