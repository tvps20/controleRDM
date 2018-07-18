import { Component } from "@angular/core";

@Component({
    selector: 'help',
    moduleId: module.id,
    templateUrl: './help.component.html',
    styleUrls: []
})

export class HelpComponent { 
    public iconInDuvida: string = String.fromCharCode(0xf059)
}