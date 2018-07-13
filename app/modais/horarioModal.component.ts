import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'ui/page';
import { ListPicker } from 'ui/list-picker';

import { Dias } from  '~/shared/statusDisciplina'
// Models
import { Horario } from '~/shared/models/horario.model';


@Component({
    moduleId: module.id,
    templateUrl: "./horarioModal.component.html",
    styleUrls: ['./horarioModal.component.css']
})
export class HorarioModalComponent implements OnInit {

    public listPicker: ListPicker;
    public qtdAulas: number[] = [1, 2, 3, 4, 5, 6];
    public dias: string[] = [Dias.Segunda, Dias.Terca, Dias.Quarta, Dias.Quinta, Dias.Sexta];

    public horario: Horario

    public constructor(private modalParams: ModalDialogParams, private page: Page){
        if(this.modalParams.context && this.modalParams.context.preSelectedHorario){
            this.horario = this.modalParams.context.preSelectedHorario;
        } else {
            this.horario = new Horario(2, "");
        }    
    }

    public sendNewHorario(){
        this.modalParams.closeCallback(this.horario);
    }

    public selectedIndexChangedAula(args) {
        let picker = <ListPicker>args.object;
        this.horario.qtdAulas = (picker.selectedIndex + 1);       
    }

    public selectedIndexChangedDia(args) {
        let picker = <ListPicker>args.object;
        this.horario.dia = this.dias[picker.selectedIndex];
    }

    
    ngOnInit(): void {

    }

}