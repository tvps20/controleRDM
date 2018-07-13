import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from "@angular/router"
import { Page } from 'ui/page';

import { Disciplina } from '~/shared/models/disciplina.model';

import { DataBaseService } from '~/services/database.service';
import { DisciplinaService } from '~/services/disciplina.service';
import { Horario } from '~/shared/models/horario.model';

@Component({
    selector: 'disciplina-Detail',
    moduleId: module.id,
    templateUrl: './disciplinaDetail.component.html',
    styleUrls: ['./disciplinaDetail.component.css']
})
export class DisciplinaDetailComponent implements OnInit{
    
    public id: number;
    public disciplina: Disciplina
    public media: number;
    public horarios: Array<Horario>

    
    constructor(private router: ActivatedRoute, private databaseService: DataBaseService, private disciplinaService: DisciplinaService, private page: Page){
        this.id = +this.router.snapshot.params["id"];
        this.horarios = [];
        this.loadDisciplina();     
    }

    ngOnInit(): void {
        this.page.on("navigatingTo", () =>  { this.loadDisciplina(); }); 
        this.previsaoNota();
        this.disciplina.ajustarNotas(); 
    }
    
    public loadDisciplina(){
        this.databaseService.getDisciplina(this.id).then((res: Disciplina) => {
            this.disciplina = res;
            this.media = this.disciplinaService.calcularMedia(this.disciplina);
            this.previsaoNota();
            this.disciplina.ajustarNotas();   

            this.databaseService.getAllHorariosDisciplina(this.disciplina.id).then((horarios: Array<Horario>) => {
                this.horarios = horarios;
            })       
        });
    }

    public previsaoNota(){
        let notaPrevisao = this.disciplinaService.previsaoDeNota(this.disciplina)

        if(notaPrevisao == 0)
            return 0;
        else if(notaPrevisao == -1)
            return false;
        else {
            if(notaPrevisao != 1)
                return "Você precisa somar " + notaPrevisao + " pontos para passar.";
            else
                return "Você precisa somar " + notaPrevisao + " ponto para passar.";
        }

            
    }

}