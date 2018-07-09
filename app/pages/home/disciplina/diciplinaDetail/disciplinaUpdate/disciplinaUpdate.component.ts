import { Component, ViewChild, ElementRef } from '@angular/core'
import { Disciplina } from '~/shared/models/disciplina.model';

@Component({
    selector: 'disciplina-Update',
    moduleId: module.id,
    templateUrl: './disciplinaUpdate.component.html',
    styleUrls: ['./disciplinaUpdate.component.css']
})
export class DisciplinaUpdateComponent {
        @ViewChild("CB1") FirstCheckBox: ElementRef;
        public disciplina: Disciplina;
        public test: string = "n mudou";
    
    public constructor() {
        this.disciplina = new Disciplina('', undefined);
    }

    public certo(){
        this.test ="mudou"
    }

    public errado(){
        this.test = "falso";
    }
}