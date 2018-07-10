import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from "@angular/router"
import { Disciplina } from '~/shared/models/disciplina.model';
import { DataBaseService } from '~/services/database.service';
import { DisciplinaService } from '~/services/disciplina.service';

@Component({
    selector: 'disciplina-Detail',
    moduleId: module.id,
    templateUrl: './disciplinaDetail.component.html',
    styleUrls: []
})
export class DisciplinaDetailComponent implements OnInit {

    public id: number;
    public disciplina: Disciplina
    public media: number;

    public textField: string;
    
    constructor(private router: ActivatedRoute, private databaseService: DataBaseService, private disciplinaService: DisciplinaService){
        this.id = +this.router.snapshot.params["id"];
        this.loadDisciplina();
    }

    ngOnInit(): void {
        this.media = this.disciplinaService.calcularMedia(this.disciplina);
    }

    public loadDisciplina(){
        this.databaseService.getDisciplina(this.id).then((res: Disciplina) => {
            this.disciplina = res;
        });
    }
}