import { Component, OnInit } from '@angular/core';
import { Disciplina } from '~/shared/models/disciplina.model';
import { DataBaseService } from '~/services/database.service';
import { RouterExtensions } from 'nativescript-angular/router';

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

        console.log(this.disciplina.nome);
        console.log(this.disciplina.cargaHoraria);
        // this.databaseService.insert(this.disciplina).then(res => {
        //     this.nav.navigate(['/home'], {clearHistory: true});
        // })
    }
}