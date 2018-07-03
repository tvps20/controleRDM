import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'ui/page';
import { TimePicker } from 'ui/time-picker';
import { ListPicker } from 'ui/list-picker';


@Component({
    moduleId: module.id,
    templateUrl: "./horarioModal.component.html",
    styleUrls: ['./horarioModal.component.css']
})
export class HorarioModalComponent implements OnInit {
    
    public preSelectedDateTime: string;
    public timePicker: TimePicker;
    public listPicker: ListPicker;
    public dias: string[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
    public qtdAulas: number[] = [1, 2, 3, 4, 5, 6];

    

    public constructor(private modalParams: ModalDialogParams, private page: Page){
        
    }

    
    ngOnInit(): void {
        
    }

}