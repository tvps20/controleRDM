import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

// Import pages
import { HomeComponent } from "./pages/home/home.component";
import { DisciplinaComponent } from "./pages/home/disciplina/disciplina.component";
import { DisciplinaDetailComponent } from "./pages/home/disciplina/diciplinaDetail/disciplinaDetail.component";
import { SobreComponent } from "./pages/sobre/sobre.component";
import { DataBaseService } from "~/services/database.service";

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
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        DisciplinaComponent,
        DisciplinaDetailComponent,
        SobreComponent
    ],
    providers: [
        DataBaseService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
