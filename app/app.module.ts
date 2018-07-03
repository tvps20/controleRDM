import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

// Import Modais
import { HorarioModalComponent } from './modais/horarioModal.component'

// Import pages
import { HomeComponent } from "./pages/home/home.component";
import { DisciplinaComponent } from "./pages/home/disciplina/disciplina.component";
import { DisciplinaDetailComponent } from "./pages/home/disciplina/diciplinaDetail/disciplinaDetail.component";
import { DisciplinaUpdateComponent } from './pages/home/disciplina/diciplinaDetail/disciplinaUpdate/disciplinaUpdate.component';
import { SobreComponent } from "./pages/sobre/sobre.component";
import { DataBaseService } from "~/services/database.service";

// importando o serviço para usar os modais
import { ModalDialogService } from 'nativescript-angular/modal-dialog' 

// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from "nativescript-angular/forms";

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
        TNSCheckBoxModule
    ],
    declarations: [
        AppComponent,
        LISTVIEW_DIRECTIVES,
        SIDEDRAWER_DIRECTIVES,
        HorarioModalComponent,
        HomeComponent,
        DisciplinaComponent,
        DisciplinaDetailComponent,
        DisciplinaUpdateComponent,
        SobreComponent
    ],
    providers: [
        DataBaseService,
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        // Local onde o angular vai carregar os components mesmo sem existir tags para ele.
        HorarioModalComponent
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
