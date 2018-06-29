import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'ui/page';
import { TimePicker } from 'ui/time-picker';
import { ListPicker } from 'ui/list-picker'

@Component({
    moduleId: module.id,
    templateUrl: "./horarioModal.component.html"
})
export class HorarioModalComponent implements OnInit {
    
    public preSelectedDateTime: string;
    public timePicker: TimePicker;
    public listPicker: ListPicker;
    public dias: string[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
    public qtdAulas: number[] = [1, 2, 3, 4];
    

    public constructor(private modalParams: ModalDialogParams, private page: Page){
        
    }

    
    ngOnInit(): void {
        
    }

}