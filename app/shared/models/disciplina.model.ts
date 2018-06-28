export class Disciplina {
    public id: number;
    public nome: string;
    public professor: string;
    public cargaHoraria: number;
    public horario: string;
    public sala: string;
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
    }
}
