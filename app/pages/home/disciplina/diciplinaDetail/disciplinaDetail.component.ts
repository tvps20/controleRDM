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
    public editIcons: string = String.fromCharCode(0xf044);
    
    constructor(private router: ActivatedRoute){
        
    }

    ngOnInit(): void {
        this.id = +this.router.snapshot.params["id"];
    }
}