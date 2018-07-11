import { Injectable } from "@angular/core";
import { Disciplina } from "~/shared/models/disciplina.model";


@Injectable()
export class DisciplinaService {

  public calcularMedia(disciplina: Disciplina){
    if(disciplina.notaFinal)
      return this.mediaFinal(disciplina);
    else
      return this.mediaAritimetrica(disciplina); 
  }
  
  public mediaAritimetrica(disciplina: Disciplina){
    var media: number = (+disciplina.primeiraNota) + (+disciplina.segundaNota) + (+disciplina.terceiraNota) + (+disciplina.quartaNota);
     
    return parseFloat((media/4).toFixed(2));
  } 

  public mediaFinal(disciplina: Disciplina){
    var media: number = this.mediaAritimetrica(disciplina);
    var mediaFinal = ((media*0.6) + (+disciplina.notaFinal*0.4));

    return parseFloat(mediaFinal.toFixed(2));
  }

  public calculoCRE(listaDeDisciplinasFechadas: Array<Disciplina>){
    let nota: number = 0;
    let totalCargaHoraria: number = 0;
    
    listaDeDisciplinasFechadas.forEach(element => {
      nota += this.calcularMedia(element) * element.cargaHoraria;
      totalCargaHoraria += element.cargaHoraria; 
    });

    let cre = nota/totalCargaHoraria

    return parseFloat(cre.toFixed(2));
  }

  public calculoPrecisaoCRE(listaDeDisciplinasAbertas: Array<Disciplina>, listaDeDisciplinasFechadas: Array<Disciplina>){
    let nota: number = 0;
    let totalCargaHoraria: number = 0;

    listaDeDisciplinasAbertas.forEach(element => {
      nota += this.calcularMedia(element) * element.cargaHoraria;
      totalCargaHoraria += element.cargaHoraria; 
    });
    
    listaDeDisciplinasFechadas.forEach(element => {
      nota += this.calcularMedia(element) * element.cargaHoraria;
      totalCargaHoraria += element.cargaHoraria;

    });
    
    let previsaCre = nota/totalCargaHoraria

    return parseFloat(previsaCre.toFixed(2));
  }

}