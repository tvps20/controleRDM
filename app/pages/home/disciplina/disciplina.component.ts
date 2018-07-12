import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as Toast from 'nativescript-toast';

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'

import { HorarioModalComponent } from '../../../modais/horarioModal.component'

import { Disciplina } from '~/shared/models/disciplina.model';
import { DataBaseService } from '~/services/database.service';
import { Status } from '~/shared/statusDisciplina';
import { Horario } from '~/shared/models/horario.model';




@Component({
    selector: 'disciplina',
    moduleId: module.id,
    templateUrl: './disciplina.component.html',
})
export class DisciplinaComponent implements OnInit {
    
    public disciplina: Disciplina;
    public horarios: Array<Horario>

        
    constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private modalService: ModalDialogService, private vcRef: ViewContainerRef){
        this.disciplina = new Disciplina('', undefined);
        this.horarios = [];
    }
    
    ngOnInit(): void {
        
    }

    public showHorarioModal(){
        let modalOptions: ModalDialogOptions = {
            fullscreen: false,
            // Contanier onde o modal vai ser carregado. (Injetando no mesmo contanier de disciplinaComponent)
            viewContainerRef: this.vcRef,
            // context: {
            //     preSelectedHorario: this.objetoHorario
            // }
        };

        this.modalService.showModal(HorarioModalComponent, modalOptions).then(newHorario => this.setNewHorario(newHorario));
    }

    public addDisciplina(){
        this.disciplina.status = Status.Matriculado;
        this.databaseService.insert(this.disciplina).then(() => {
            this.databaseService.insertHorario(this.horarios[0]).then(() => {
                this.nav.navigate(['/home'], {clearHistory: true});
            }) 
        })
    }

    private setNewHorario(newHorario: Horario){
        if(newHorario){
            this.horarios.push(newHorario);
            Toast.makeText("Horário adicionado").show();
        }
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