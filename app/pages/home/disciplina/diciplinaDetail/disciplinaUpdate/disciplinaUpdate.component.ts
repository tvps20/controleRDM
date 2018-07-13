import { Component, ViewChild, ElementRef, ViewContainerRef } from '@angular/core'
import { Disciplina } from '~/shared/models/disciplina.model';
import { ActivatedRoute } from "@angular/router"
import * as Toast from 'nativescript-toast';
import { RouterExtensions } from 'nativescript-angular/router';

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'

import { DataBaseService } from '~/services/database.service';
import { DisciplinaService } from '~/services/disciplina.service';

import { HorarioModalComponent } from '~/modais/horarioModal.component';
import { Horario } from '~/shared/models/horario.model';
import { Status } from '~/shared/statusDisciplina';


@Component({
    selector: 'disciplina-Update',
    moduleId: module.id,
    templateUrl: './disciplinaUpdate.component.html',
    styleUrls: ['./disciplinaUpdate.component.css']
})
export class DisciplinaUpdateComponent {

        public id: number;
        @ViewChild("CB1") FirstCheckBox: ElementRef;
        public disciplina: Disciplina;
        public horarios: Array<Horario>

    
    public constructor(private router: ActivatedRoute, private databaseService: DataBaseService, private nav: RouterExtensions,  private modalService: ModalDialogService, private vcRef: ViewContainerRef, private disciplinaService: DisciplinaService) {
        this.id = +this.router.snapshot.params["id"];
        this.horarios = [];
        this.loadDisciplina();
    }

    public loadDisciplina(){
        this.databaseService.getDisciplina(this.id).then((res: Disciplina) => {        
            this.disciplina = res;
            this.databaseService.getAllHorariosDisciplina(this.disciplina.id).then((horarios: Array<Horario>) => {
                this.horarios = horarios;
            })
        });
    }

    public showHorarioModal(){
        let modalOptions: ModalDialogOptions = {
            fullscreen: false,
            // Contanier onde o modal vai ser carregado. (Injetando no mesmo contanier de disciplinaComponent)
            viewContainerRef: this.vcRef,
        };

        this.modalService.showModal(HorarioModalComponent, modalOptions).then(newHorario => this.setNewHorario(newHorario));
    }


    public upDateHorarioModal(horario: Horario){
        let modalOptions: ModalDialogOptions = {
            fullscreen: false,
            // Contanier onde o modal vai ser carregado. (Injetando no mesmo contanier de disciplinaComponent)
            viewContainerRef: this.vcRef,
            // Para Enviar os dados pra dentro do Modal
            // context: {
            //     preSelectedHorario: objeto do tipo horário
            // }
        };

        this.modalService.showModal(HorarioModalComponent, modalOptions).then(newHorario => this.setNewHorario(newHorario));
    }

    private setNewHorario(newHorario: Horario){
        this.disciplinaService.setNewHorario(newHorario, this.horarios);
    }

    public deleteHorario(horario: Horario){
        this.disciplinaService.deleteHorario(horario, this.horarios);
    }

    public deleteHorariosBd(idDisciplina: number){
        this.databaseService.deleteHorarios(idDisciplina);
    }

    public updateDisciplina(){
        this.verificaStatus(this.disciplina);
        this.databaseService.update(this.disciplina).then(() => {
            this.deleteHorariosBd(this.disciplina.id);

            this.horarios.forEach(element => {
                element.idDisciplina = this.disciplina.id;
                this.databaseService.insertHorario(element)                
            });

            this.nav.backToPreviousPage();
        })
    }

    public verificaStatus(disciplina: Disciplina){
        if(disciplina.isClosed){
            var nota = this.disciplinaService.calcularMedia(this.disciplina);
            if(nota >= 5)
                this.disciplina.status = Status.Aprovado
            else   
                this.disciplina.status = Status.Reprovado
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