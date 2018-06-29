import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'

import { HorarioModalComponent } from '../../../modais/horarioModal.component'

import { Disciplina } from '~/shared/models/disciplina.model';
import { DataBaseService } from '~/services/database.service';
import { Status } from '~/shared/statusDisciplina';


@Component({
    selector: 'disciplina',
    moduleId: module.id,
    templateUrl: './disciplina.component.html',
})
export class DisciplinaComponent implements OnInit {
    
    public disciplina: Disciplina;


    constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private modalService: ModalDialogService, private vcRef: ViewContainerRef){
        this.disciplina = new Disciplina('', undefined);
    }
    
    ngOnInit(): void {
        
    }

    public showHorarioModal(){
        let modalOptions: ModalDialogOptions = {
            fullscreen: false,
            // Contanier onde o modal vai ser carregado. (Injetando no mesmo contanier de disciplinaComponent)
            viewContainerRef: this.vcRef
        };

        this.modalService.showModal(HorarioModalComponent, modalOptions);
    }

    public addDisciplina(){
        this.disciplina.status = Status.Matriculado;
        this.databaseService.insert(this.disciplina).then(res => {
            this.nav.navigate(['/home'], {clearHistory: true});
        })
    }
}