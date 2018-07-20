import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'ui/page';

import { Status } from  '~/shared/statusDisciplina'
// Models
import { Horario } from '~/shared/models/horario.model';
import { Disciplina } from '~/shared/models/disciplina.model';
import { ValidatorService } from '~/services/validator.service';

@Component({
    moduleId: module.id,
    templateUrl: "./disciplinaModal.component.html",
    styleUrls: ['./disciplinaModal.component.css']
})
export class DisciplinaModalComponent implements OnInit {

    public disciplina: Disciplina;
    @ViewChild("CB1") FirstCheckBox: ElementRef;
    public notaGeral: number;
    
    public constructor(private modalParams: ModalDialogParams, private page: Page, private validatorService: ValidatorService){
        if(this.modalParams.context && this.modalParams.context.preSelectedDisciplina){
            this.disciplina = this.modalParams.context.preSelectedHorario;
        } else {
            this.disciplina = new Disciplina("", 60);
        }    
    }

    ngOnInit(): void {
        
    }

    public sendNewDisciplina(){
        if(this.disciplina.isClosed){
            if(this.notaGeral >= 5)
                this.disciplina.status = Status.Aprovado;
            else    
                this.disciplina.status = Status.Reprovado;
        } else {
            this.disciplina.status = Status.Matriculado;
        }
        
        this.disciplina.primeiraNota = this.notaGeral;
        this.disciplina.segundaNota = this.notaGeral;
        this.disciplina.terceiraNota = this.notaGeral;
        this.disciplina.quartaNota = this.notaGeral

        this.modalParams.closeCallback(this.disciplina);
    }


    // Validators
    public cargaHorariaValidator(){
        return this.validatorService.cargaHorariaValidator(this.disciplina);
    }

    public notaValidator(){
        return this.validatorService.notaGeralValidator(this.notaGeral);
    }

}