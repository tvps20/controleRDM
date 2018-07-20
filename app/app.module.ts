import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

// Import Modais
import { HorarioModalComponent } from './modais/horarioModal.component'
import { DisciplinaModalComponent } from './modais/disciplina/disciplinaModal.component'

// Import pages
import { HomeComponent } from "./pages/home/home.component";
import { DisciplinaDetailComponent } from "./pages/home/disciplina/diciplinaDetail/disciplinaDetail.component";
import { DisciplinaUpdateComponent } from './pages/home/disciplina/diciplinaDetail/disciplinaUpdate/disciplinaUpdate.component';
import { SobreComponent } from "./pages/sobre/sobre.component";
import { HelpComponent } from "./pages/help/help.component";

// Services
import { DataBaseService } from "~/services/database.service";
import { DisciplinaService } from "./services/disciplina.service";
import { ValidatorService } from "./services/validator.service";

// importando o serviço para usar os modais
import { ModalDialogService } from 'nativescript-angular/modal-dialog' 

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";

//import { ReactiveFormsModule } from '@angular/forms'


// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule, 
    ],
    declarations: [
        AppComponent,
        HorarioModalComponent,
        DisciplinaModalComponent,
        HomeComponent,
        DisciplinaDetailComponent,
        DisciplinaUpdateComponent,
        SobreComponent,
        HelpComponent
    ],
    providers: [
        DataBaseService,
        DisciplinaService,
        ValidatorService,
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        // Local onde o angular vai carregar os components mesmo sem existir tags para ele.
        HorarioModalComponent,
        DisciplinaModalComponent
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
