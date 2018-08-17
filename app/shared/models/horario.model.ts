export class Horario {
    public id: number;
    public sala: string;
    public dia: string;
    public hora: string;
    public qtdAulas: number;
    public idDisciplina: number;
    public nomeDisciplina: string;

    public constructor(qtdAulas: number, dia: string){
        this.qtdAulas = qtdAulas;
        this.dia = dia;
    }

    public makeHorario(){
        let horario:string;
        if(this.qtdAulas <= 1)
            return horario = this.dia + "/" + this.qtdAulas + " aula" + " " + this.hora + "h" + "/" + this.sala;
        else
            return horario = this.dia + "/" + this.qtdAulas + " aulas" + " " + this.hora + "h" + "/" + this.sala;
    }

    public getHorario(){
        if(this.qtdAulas <= 1)
            return `Hórario: ${this.hora} / ${this.qtdAulas} aula`;
        else
            return `Hórario: ${this.hora} / ${this.qtdAulas} aulas`;
    }

    public getSala(){
        return `Sala: ${this.sala}`;
    }

    public getNomeDisciplina(){
        return `Disciplina: ${this.nomeDisciplina}`;
    }
}