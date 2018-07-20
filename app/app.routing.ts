import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

// Import pages
import { HomeComponent } from "./pages/home/home.component";
import { DisciplinaDetailComponent } from "./pages/home/disciplina/diciplinaDetail/disciplinaDetail.component";
import { DisciplinaUpdateComponent } from './pages/home/disciplina/diciplinaDetail/disciplinaUpdate/disciplinaUpdate.component';
import { SobreComponent } from "./pages/sobre/sobre.component";
import { HelpComponent } from "./pages/help/help.component"

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "home/:index", component: HomeComponent },
    { path: "disciplina/:id", component: DisciplinaDetailComponent },
    { path: "update/:id", component: DisciplinaUpdateComponent },
    { path: "sobre", component: SobreComponent },
    { path: "help", component: HelpComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }