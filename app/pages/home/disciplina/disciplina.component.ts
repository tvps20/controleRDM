import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
    
    public form: FormGroup;
    public disciplina: Disciplina;
    public horarios: Array<Horario>

        
    constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private modalService: ModalDialogService, private vcRef: ViewContainerRef, private formBuilder: FormBuilder){
        this.disciplina = new Disciplina('', undefined);
        this.horarios = [];

        this.form = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            professor: [null],
            cargaHoraria: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
            primeiraNota: [null, [Validators.maxLength(2)]],
            segundaNota: [null],
            terceiraNota: [null],
            quartaNota: [null],
            notaFinal: [null],
        })
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
        this.makeDisciplina();
        this.databaseService.insert(this.disciplina).then(res => {
            this.nav.navigate(['/home'], {clearHistory: true});
        })
    }

    private setNewHorario(newHorario: Horario){
        if(newHorario){
            this.horarios.push(newHorario);
        }
    }

    private makeDisciplina(){
        this.disciplina.nome = this.form.value.nome;
        this.disciplina.professor = this.form.value.professor;
        this.disciplina.cargaHoraria = this.form.value.cargaHoraria;
        this.disciplina.status = Status.Matriculado;
    }

    public notaConfirmationValidator(form: FormGroup){
        let nota: number = form.get('primeiraNota').value + form.get('segundaNota').value + form.get('terceiraNota').value + form.get('quartaNota').value;

        if(nota >= 16 && nota<= 27.9){
            form.get('makeEnd').setErrors(null);
        } else {
            form.get('makeEnd').setErrors({'final': false})
        }
    }


}