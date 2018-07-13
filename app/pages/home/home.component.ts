import { Component, OnInit } from '@angular/core';
import * as dialogs from 'ui/dialogs';
import { Page } from 'ui/page';
import { ActivatedRoute } from "@angular/router"
// Importanto pacote para notificações simples
import * as Toast from 'nativescript-toast';

import { DataBaseService } from '~/services/database.service';
import { Disciplina } from '~/shared/models/disciplina.model';
import { DisciplinaService } from '~/services/disciplina.service';
import { Dias } from '~/shared/statusDisciplina';
import { Horario } from '~/shared/models/horario.model';


@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public disciplinasAbertas: Array<Disciplina> = [];
    public disciplinasFechadas: Array<Disciplina> = [];
    public dias: Array<string> = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
    public horarios: Array<Horario>
    public icons: Map<string, string> = new Map<string, string>();
    public data: Date;
    public dia: number;
    public index: number;
    
    public constructor(private router: ActivatedRoute, private databaseService: DataBaseService, private page: Page, private disciplinaService: DisciplinaService){
        this.index = 0;
        this.data = new Date();
        this.dia = this.data.getDay();
        this.horarios = [];   
        this.index = 0;   
    }

    ngOnInit(): void {
        this.index = +this.router.snapshot.params["index"];
        this.setIcons();
        this.loadDisciplinas();  
        this.page.on("navigatingTo", () => this.loadDisciplinas());
    }
    
    public deleteDisciplina(disciplina: Disciplina){
        dialogs.confirm({title: "Apagar", message: `Deseja realmente excluir a disciplina "${disciplina.nome}"?`, okButtonText: "Sim", cancelButtonText: "Cancelar",})
            .then(result => {
                if(result) {
                    this.databaseService.deleteHorarios(disciplina.id);
                    this.databaseService.delete(disciplina.id);
                    Toast.makeText("Disciplina Apagada").show();
                    this.loadDisciplinas();
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
                
                this.databaseService.getAllHorarioDia(this.abreviarDia(this.dias[this.dia])).then((horarios: Array<Horario>) => {
                    this.horarios = horarios;
                })

            })
        });
    }

    public haveHorario(){
        return this.disciplinaService.haveHorario(this.horarios);
    }

    private abreviarDia(dia: string): string {
        if(dia === 'Domingo')
            return Dias.Domingo;
        else if(dia === 'Segunda-Feira')
            return Dias.Segunda;
        else if(dia === 'Terça-Feira')
            return Dias.Terca;
        else if(dia === 'Quarta-Feira')
            return Dias.Quarta;
        else if(dia === 'Quinta-Feira')
            return Dias.Quinta;
        else if(dia === 'Sexta-Feira')
            return Dias.Sexta;
        else
            return Dias.Sabado;
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

    public calcularCre(){
        return this.disciplinaService.calculoCRE(this.disciplinasFechadas);
    }

    public previsaoCre(){
        return this.disciplinaService.calculoPrecisaoCRE(this.disciplinasAbertas, this.disciplinasFechadas);
    }

    public chAcumulada(){
        return this.disciplinaService.calcularChAcumulada(this.disciplinasFechadas);
    }

    // public getIcon({ isClosed }) {
    //     if (isClosed === "true") {
    //         return this.icons.get('aprovado')
    //     } else if (isClosed === "false") {
    //         return this.icons.get('reprovadoCheio');
    //     }
    // }
}