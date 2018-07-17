import { Component, ViewChild, ElementRef, ViewContainerRef } from '@angular/core'
import { Disciplina } from '~/shared/models/disciplina.model';
import { ActivatedRoute } from "@angular/router"
import * as Toast from 'nativescript-toast';
import { RouterExtensions } from 'nativescript-angular/router';

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'

import { DataBaseService } from '~/services/database.service';
import { DisciplinaService } from '~/services/disciplina.service';
import { ValidatorService } from '~/services/validator.service';

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

    
    public constructor(private router: ActivatedRoute, private databaseService: DataBaseService, private nav: RouterExtensions,  private modalService: ModalDialogService, private vcRef: ViewContainerRef, private disciplinaService: DisciplinaService, private validatorService: ValidatorService) {
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

    private setNewHorario(newHorario: Horario){
        this.disciplinaService.setNewHorario(newHorario, this.horarios);
    }

    public deleteHorario(horario: Horario){
        this.disciplinaService.deleteHorario(horario, this.horarios);
    }

    private deleteHorariosBd(idDisciplina: number){
        this.databaseService.deleteHorarios(idDisciplina);
    }

    public haveHorario(){
        return this.disciplinaService.haveHorario(this.horarios);
    }

    public updateDisciplina(){
        if(this.verificaStatus(this.disciplina)){
            this.databaseService.deleteHorarios(this.disciplina.id);
            this.databaseService.update(this.disciplina).then(() => {
                this.deleteHorariosBd(this.disciplina.id);

                Toast.makeText("Disciplina Atualizada").show();
                this.nav.navigate(['/home', 1], {clearHistory: true, transition: {
                    name: 'fade', duration: 800, curve: 'linear'
                }});
            })
            
        } else {
            this.databaseService.update(this.disciplina).then(() => {
                this.deleteHorariosBd(this.disciplina.id);

                this.horarios.forEach(element => {
                    element.idDisciplina = this.disciplina.id;
                    element.nomeDisciplina = this.disciplina.nome;
                    this.databaseService.insertHorario(element);               
                });

                Toast.makeText("Disciplina Atualizada").show();
                this.nav.backToPreviousPage();
            })
        }
    }

    public verificaStatus(disciplina: Disciplina){
        if(disciplina.isClosed){
            var nota = this.disciplinaService.calcularMedia(this.disciplina);
            if(nota >= 5){
                this.disciplina.status = Status.Aprovado;
                return true;
            }
            else{   
                this.disciplina.status = Status.Reprovado
                return true;
            }
        } else {
            return false;
        }
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