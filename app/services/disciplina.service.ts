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
    var mediaFinal = ((media*0.6) + (disciplina.notaFinal*0.4));

    console.log((10*0.6))
    return parseFloat(mediaFinal.toFixed(2));
  }

}