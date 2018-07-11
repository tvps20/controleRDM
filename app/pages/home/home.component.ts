import { Component, OnInit } from '@angular/core';
import * as dialogs from 'ui/dialogs';
import { Page } from 'ui/page';
// Importanto pacote para notificações simples
import * as Toast from 'nativescript-toast';

import { DataBaseService } from '~/services/database.service';
import { Disciplina } from '~/shared/models/disciplina.model';
import { DisciplinaService } from '~/services/disciplina.service';


@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public disciplinasAbertas: Array<Disciplina> = [];
    public disciplinasFechadas: Array<Disciplina> = [];
    public icons: Map<string, string> = new Map<string, string>();
    
    public constructor(private databaseService: DataBaseService, private page: Page, private disciplinaService: DisciplinaService){
        this.setIcons();
        this.loadDisciplinas();        
    }

    ngOnInit(): void {
        this.page.on("navigatingTo", () => this.loadDisciplinas());
    }
    
    public deleteDisciplina(disciplina: Disciplina){
        dialogs.confirm(`Deseja realmente excluir a disciplina "${disciplina.nome}"`)
            .then(result => {
                if(result) {
                    this.databaseService.delete(disciplina.id);
                    this.loadDisciplinas();
                } else {
                    alert("Ocorreu um erro ao tentar remover, tente novamente.")
                }
        })
    }

    private loadDisciplinas(){

        this.disciplinasAbertas = [];
        this.disciplinasFechadas = [];

        this.databaseService.getAll().then((res: Array<Disciplina>) => {
            res.forEach(disciplina => {

                let { isClosed } = disciplina;

                if (isClosed.toString() === "true") {
                    this.disciplinasFechadas.push(disciplina);
                } else {
                    this.disciplinasAbertas.push(disciplina);                    
                }
                
            })
        });
    }

    private setIcons() {
        this.icons.set('trash', String.fromCharCode(0xf014));
        this.icons.set('aprovado', String.fromCharCode(0xf087));
        this.icons.set('reprovado', String.fromCharCode(0xf088));
        this.icons.set('reprovadoCheio', String.fromCharCode(0xf165));     
    }

    public calcularNota(disciplina: Disciplina){
        return this.disciplinaService.calcularMedia(disciplina);
    }

    // public getIcon({ isClosed }) {
    //     if (isClosed === "true") {
    //         return this.icons.get('aprovado')
    //     } else if (isClosed === "false") {
    //         return this.icons.get('reprovadoCheio');
    //     }
    // }
}