import { Component, ViewChild, ElementRef, ViewContainerRef } from '@angular/core'
import { Disciplina } from '~/shared/models/disciplina.model';
import { ActivatedRoute } from "@angular/router"
import * as Toast from 'nativescript-toast';

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'

import { DataBaseService } from '~/services/database.service';
import { RouterExtensions } from 'nativescript-angular/router';

import { HorarioModalComponent } from '~/modais/horarioModal.component';
import { Horario } from '~/shared/models/horario.model';


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

    
    public constructor(private router: ActivatedRoute, private databaseService: DataBaseService, private nav: RouterExtensions,  private modalService: ModalDialogService, private vcRef: ViewContainerRef,) {
        this.id = +this.router.snapshot.params["id"];
        this.horarios = [];
        this.loadDisciplina();
    }

    public loadDisciplina(){
        this.databaseService.getDisciplina(this.id).then((res: Disciplina) => {
            this.disciplina = res;
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
            //     preSelectedHorario: horario
            // }
        };

        this.modalService.showModal(HorarioModalComponent, modalOptions).then(newHorario => this.setNewHorario(newHorario));
    }

    private setNewHorario(newHorario: Horario){
        if(newHorario){
            this.horarios.push(newHorario);
            Toast.makeText("Horário adicionado").show();
        }
    }

    public deleteHorario(){

    }

    public updateDisciplina(){
        this.databaseService.update(this.disciplina).then(() => {
            this.nav.navigate(['/home'], {clearHistory: true});
        })
    }

    public notaValorValidation(): boolean {
        let somaNota: number = (+this.disciplina.primeiraNota) + (+this.disciplina.segundaNota) + (+this.disciplina.terceiraNota) + (+this.disciplina.quartaNota);

        console.log(somaNota)
        if((somaNota >= 16) && (somaNota < 28)){
            console.log("faz")
            return true;
        } else {
            console.log("n faz")
            return false;
        }
    }
}