import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from "@angular/router"

@Component({
    selector: 'disciplina-Detail',
    moduleId: module.id,
    templateUrl: './disciplinaDetail.component.html',
    styleUrls: []
})
export class DisciplinaDetailComponent implements OnInit {

    public id: number;
    
    constructor(private router: ActivatedRoute){
        this.id = +this.router.snapshot.params["id"];
        console.log(this.id);
    }

    ngOnInit(): void {
        
    }
}