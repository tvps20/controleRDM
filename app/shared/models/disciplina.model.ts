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

    public ajustarNotas(){
        if(this.primeiraNota)
            this.primeiraNota = +this.primeiraNota.toFixed(2); 
        if(this.segundaNota)
            this.segundaNota = +this.segundaNota.toFixed(2);
        if(this.terceiraNota)
            this.terceiraNota = +this.terceiraNota.toFixed(2);
        if(this.quartaNota)
            this.quartaNota = +this.quartaNota.toFixed(2);
        if(this.notaFinal)
            this.notaFinal = +this.notaFinal.toFixed(2);  
    }
}
