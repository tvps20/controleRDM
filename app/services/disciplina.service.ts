import { Injectable } from "@angular/core";
import { Disciplina } from "~/shared/models/disciplina.model";


@Injectable()
export class DisciplinaService {
  
  public mediaAritimetrica(disciplina: Disciplina){
    var media: number = (+disciplina.primeiraNota) + (+disciplina.segundaNota) + (+disciplina.terceiraNota) + (+disciplina.quartaNota);
     
    return parseFloat((media/4).toFixed(2));
  } 


}