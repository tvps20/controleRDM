import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { Disciplina } from '~/shared/models/disciplina.model';
import { DataBaseService } from '~/services/database.service';


@Component({
    selector: 'disciplina',
    moduleId: module.id,
    templateUrl: './disciplina.component.html',
})
export class DisciplinaComponent implements OnInit {
    
    public disciplina: Disciplina;


    constructor(private databaseService: DataBaseService, private nav: RouterExtensions){
        this.disciplina = new Disciplina('', 0);
    }
    
    ngOnInit(): void {
        
    }

    public addDisciplina(){
        this.databaseService.insert(this.disciplina).then(res => {
            this.nav.navigate(['/home'], {clearHistory: true});
        })
    }
}