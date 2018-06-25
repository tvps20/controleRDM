import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    public disciplinas: Array<any> = [];
    
    public constructor(){
        this.loadDisciplinas();
    }

    ngOnInit(): void {

    }

    private loadDisciplinas(){
        this.disciplinas = [
            {id: 1, nome: "Linguagens Formais", nota: 8.4, paga: false},
            {id: 2, nome: "Banco de Dados", nota: 7.5, paga: false},
            {id: 3, nome: "Paradgmas Educacionais", nota: 9.4, paga: false},
            {id: 4, nome: "Sistemas Operacionais", nota: 7, paga: false},
            {id: 5, nome: "Cálculo Numérico", nota: 7.6, paga: false}
        ]
    }
}