import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'

import { ValidatorService } from '~/services/validator.service';
import { DataBaseService } from '~/services/database.service';
import { DisciplinaService } from '~/services/disciplina.service';

import { HorarioModalComponent } from '~/modais/horarioModal.component';

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

        
    constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private validatorService: ValidatorService, private modalService: ModalDialogService, private vcRef: ViewContainerRef, private disciplinaService: DisciplinaService){
        this.disciplina = new Disciplina('', undefined);
        this.horarios = [];
    }
    
    ngOnInit(): void {
        
    }

    public addDisciplina(){
        this.disciplina.status = Status.Matriculado;
        this.databaseService.insert(this.disciplina).then((id) => {
            this.horarios.forEach(element => {
                element.idDisciplina = +id;
                this.databaseService.insertHorario(element);                
            });
            
            Toast.makeText("Disciplina Adicionada").show();
            this.nav.navigate(['/home', 1], {clearHistory: true});
        })
    }

    public showHorarioModal(){
        let modalOptions: ModalDialogOptions = {
            fullscreen: false,
            // Contanier onde o modal vai ser carregado. (Injetando no mesmo contanier de disciplinaComponent)
            viewContainerRef: this.vcRef,
        };

        this.modalService.showModal(HorarioModalComponent, modalOptions).then(newHorario => this.setNewHorario(newHorario));
    }

    private setNewHorario(newHorario: Horario){
        this.disciplinaService.setNewHorario(newHorario, this.horarios);
    }

    public deleteHorario(horario: Horario){
        this.disciplinaService.deleteHorario(horario, this.horarios);
    }

    public haveHorario(){
        return this.disciplinaService.haveHorario(this.horarios);
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