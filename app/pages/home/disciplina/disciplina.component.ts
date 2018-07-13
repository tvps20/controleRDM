import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';

import { Disciplina } from '~/shared/models/disciplina.model';
import { DataBaseService } from '~/services/database.service';
import { Status } from '~/shared/statusDisciplina';
import { Horario } from '~/shared/models/horario.model';
import { DisciplinaService } from '~/services/disciplina.service';


@Component({
    selector: 'disciplina',
    moduleId: module.id,
    templateUrl: './disciplina.component.html',
})
export class DisciplinaComponent implements OnInit {
    
    public disciplina: Disciplina;
    public horarios: Array<Horario>

        
    constructor(private databaseService: DataBaseService, private nav: RouterExtensions){
        this.disciplina = new Disciplina('', undefined);
        this.horarios = [];
    }
    
    ngOnInit(): void {
        
    }

    public addDisciplina(){
        this.disciplina.status = Status.Matriculado;
        this.databaseService.insert(this.disciplina).then(() => {
            this.horarios.forEach(element => {
                this.databaseService.insertHorario(element)                
            });
            
            Toast.makeText("Disciplina Adicionada").show();
            this.nav.navigate(['/home', 1], {clearHistory: true});
        })
    }
    
    // Validators
    public notaValorValidation(){
        let somaNota: number = (+this.disciplina.primeiraNota) + (+this.disciplina.segundaNota) + (+this.disciplina.terceiraNota) + (+this.disciplina.quartaNota);

        if((somaNota >= 16) && (somaNota < 28) && (!this.disciplina.notaFinal))
            return false;
        else if(((somaNota < 16) || (somaNota >= 28)) && (this.disciplina.notaFinal))
            return true;    
        else 
            return false;    
    }

    public notaValidator(){

        if((+this.disciplina.primeiraNota) < 0 || (+this.disciplina.primeiraNota) > 10)
            return true;
        else if ((+this.disciplina.segundaNota) < 0 || (+this.disciplina.segundaNota) > 10)
            return true;
        else if ((+this.disciplina.terceiraNota) < 0 || (+this.disciplina.terceiraNota) > 10)
            return true;
        else if ((+this.disciplina.quartaNota) < 0 || (+this.disciplina.quartaNota) > 10)
            return true;
        else if ((+this.disciplina.notaFinal) < 0 || (+this.disciplina.notaFinal) > 10)
            return true;
        else
            return false
    }

}