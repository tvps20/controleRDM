import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';

import { ValidatorService } from '~/services/validator.service';
import { DataBaseService } from '~/services/database.service';

import { Disciplina } from '~/shared/models/disciplina.model';
import { Horario } from '~/shared/models/horario.model';
import { Status } from '~/shared/statusDisciplina';


@Component({
    selector: 'disciplina',
    moduleId: module.id,
    templateUrl: './disciplina.component.html',
})
export class DisciplinaComponent implements OnInit {
    
    public disciplina: Disciplina;
    public horarios: Array<Horario>

        
    constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private validatorService: ValidatorService){
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
        return this.validatorService.notaValorValidator(this.disciplina);  
    }

    public notaValidator(){
        return this.validatorService.notaValidator(this.disciplina);
    }

    public cargaHorariaValidator(){
        return this.validatorService.cargaHorariaValidator(this.disciplina);
    }

}