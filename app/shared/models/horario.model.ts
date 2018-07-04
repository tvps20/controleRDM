export class Horario {
    public id: number;
    public sala: number;
    public dia: string;
    public hora: string;
    public qtdAulas: number;
    public idDisciplina: number;

    public constructor(qtdAulas: number, dia: string){
        this.qtdAulas = qtdAulas;
        this.dia = dia;
    }

    public makeHorario(){
        let horario: string = this.dia + "/" + this.qtdAulas + " " + this.hora + " " + this.sala;

        return horario;
    }
}