import { Component } from "@angular/core";

@Component({
    selector: 'sobre',
    moduleId: module.id,
    templateUrl: './sobre.component.html',
    styleUrls: []
})

export class SobreComponent { 
    public iconInformation: string = String.fromCharCode(0xf004);
    public iconLove: string = String.fromCharCode(0xf001);
}