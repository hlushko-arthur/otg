import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignComponent } from "./sign.component";

const routes: Routes = [{
	path: '',
	component: SignComponent
}]
@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [SignComponent]
})

export class MainModule { }