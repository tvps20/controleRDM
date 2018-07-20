import { Component, OnInit} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';

// Services
import { ValidatorService } from '~/services/validator.service';
import { DataBaseService } from '~/services/database.service';

// Models
import { HoraExtra } from '~/shared/models/horaExtra.model';


@Component({
    selector: 'horaExtra',
    moduleId: module.id,
    templateUrl: './horaExtra.component.html',
})
export class HoraExtraComponent implements OnInit {

    public horaExtra: HoraExtra;

    constructor(private databaseService: DataBaseService, private nav: RouterExtensions, private validatorService: ValidatorService){
        this.horaExtra = new HoraExtra();
    }

    // Validators
    public cargaHorariaValidator(){
        return this.validatorService.cargaHoraExtraValidator(this.horaExtra);
    }

    ngOnInit(): void {
    
    }

    public addHoraExtra(){
        this.databaseService.insertHoraExtra(this.horaExtra);

        Toast.makeText("Hora Extra Adicionada").show();
        this.nav.navigate(['/home', 3], {clearHistory: true, transition: {
            name: 'fade', duration: 300, curve: 'linear'
        }});
    }
}