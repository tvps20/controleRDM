import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';

// Services
import { ValidatorService } from '~/services/validator.service';
import { DataBaseService } from '~/services/database.service';

// Models
import { Disciplina } from '~/shared/models/disciplina.model';
import { Status } from  '~/shared/statusDisciplina'



@Component({
    selector: 'disciplina',
    moduleId: module.id,
    templateUrl: './disciplina.component.html',
})
export class DisciplinaComponent implements OnInit {
    public disciplina: Disciplina;
    @ViewChild("CB1") FirstCheckBox: ElementRef;
    public notaGeral: number;
    
    public constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private validatorService: ValidatorService){
        this.disciplina = new Disciplina("", 60);
    }

    ngOnInit(): void {
        
    }

    public addDisciplina(){
        if(this.disciplina.isClosed){
            if(this.notaGeral >= 5)
                this.disciplina.status = Status.Aprovado;
            else    
                this.disciplina.status = Status.Reprovado;

            this.disciplina.primeiraNota = this.notaGeral;
            this.disciplina.segundaNota = this.notaGeral;
            this.disciplina.terceiraNota = this.notaGeral;
            this.disciplina.quartaNota = this.notaGeral;

            this.databaseService.insert(this.disciplina);
        } else {
            this.disciplina.status = Status.Matriculado;

            this.databaseService.insert(this.disciplina);
        }
        
        Toast.makeText("Disciplina Adicionada").show();
        this.nav.navigate(['/home', 1], {clearHistory: true, transition: {
            name: 'fade', duration: 300, curve: 'linear'
        }});
    }


    // Validators
    public cargaHorariaValidator(){
        return this.validatorService.cargaHorariaValidator(this.disciplina);
    }

    public notaValidator(){
        return this.validatorService.notaGeralValidator(this.notaGeral);
    }
}