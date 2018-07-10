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

    public disciplinas: Array<Disciplina> = [];
    public icons: Map<string, string> = new Map<string, string>();
    
    public constructor(private databaseService: DataBaseService, private page: Page, private disciplinaService: DisciplinaService){
        this.setIcons();
        this.loadDisciplinas();        
    }

    ngOnInit(): void {
        console.log(this.disciplinaService.mediaAritimetrica(this.disciplinas[1]));
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
        this.databaseService.getAll().then((res: Array<Disciplina>) => {
            this.disciplinas = res;
        });
    }

    private setIcons() {
        this.icons.set('trash', String.fromCharCode(0xf014));
        this.icons.set('aprovado', String.fromCharCode(0xf087));
        this.icons.set('reprovado', String.fromCharCode(0xf088));
        this.icons.set('reprovadoCheio', String.fromCharCode(0xf165));     
    }
}