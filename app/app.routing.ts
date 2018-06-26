import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

// Import pages
import { HomeComponent } from "./pages/home/home.component";
import { DisciplinaComponent } from "./pages/home/disciplina/disciplina.component";
import { DisciplinaDetailComponent } from "./pages/home/disciplina/diciplinaDetail/disciplinaDetail.component";
import { SobreComponent } from "./pages/sobre/sobre.component";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "disciplina", component: DisciplinaComponent},
    { path: "disciplina/:id", component: DisciplinaDetailComponent},
    { path: "sobre", component: SobreComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }