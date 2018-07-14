import { Injectable } from "@angular/core";

import { Disciplina } from "~/shared/models/disciplina.model";


@Injectable()
export class ValidatorService {

    public notaValorValidator(disciplina: Disciplina){
        let somaNota: number = (+disciplina.primeiraNota) + (+disciplina.segundaNota) + (+disciplina.terceiraNota) + (+disciplina.quartaNota);

        if((somaNota >= 16) && (somaNota < 28) && (!disciplina.notaFinal))
            return false;
        else if(((somaNota < 16) || (somaNota >= 28)) && (disciplina.notaFinal))
            return true;    
        else 
            return false;    
    }

    public notaValidator(disciplina: Disciplina){
        if((+disciplina.primeiraNota) < 0 || (+disciplina.primeiraNota) > 10)
            return true;
        else if ((+disciplina.segundaNota) < 0 || (+disciplina.segundaNota) > 10)
            return true;
        else if ((+disciplina.terceiraNota) < 0 || (+disciplina.terceiraNota) > 10)
            return true;
        else if ((+disciplina.quartaNota) < 0 || (+disciplina.quartaNota) > 10)
            return true;
        else if ((+disciplina.notaFinal) < 0 || (+disciplina.notaFinal) > 10)
            return true;
        else
            return false
    }
  
    public cargaHorariaValidator(disciplina: Disciplina){
        if(disciplina.cargaHoraria < 10)
            return true;
        else 
            return false;    
    }
}