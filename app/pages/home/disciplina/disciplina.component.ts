import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

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
    public teste: Array<any>;
    public horarios: Array<Horario>

    
    constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private modalService: ModalDialogService, private vcRef: ViewContainerRef){
        this.disciplina = new Disciplina('', undefined);
        this.teste = [{nome: "seg/2 lab2"}, {nome: "ter/2 c202"}, {nome: "qua/2 18:00"}, {nome: "qui/20:00"}, {nome: "sex/2 c202"}, {nome: "seg/2 18:00 c202"}]
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
        this.databaseService.insert(this.disciplina).then(res => {
            this.nav.navigate(['/home'], {clearHistory: true});
        })
    }

    public setNewHorario(newHorario: Horario){
        if(newHorario){
            this.horarios.push(newHorario);
        }
    }
}