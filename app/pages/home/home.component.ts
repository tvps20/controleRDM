import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
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
            {id: 1, nome: "Linguagens Formais", nota: 8.4, isClosed: true},
            {id: 2, nome: "Banco de Dados", nota: 7.5, isClosed: false},
            {id: 3, nome: "Paradgmas Educacionais", nota: 9.4, isClosed: true},
            {id: 4, nome: "Sistemas Operacionais", nota: 7, isClosed: true},
            {id: 5, nome: "Cálculo Numérico", nota: 7.6, isClosed: true}
        ]
    }
}