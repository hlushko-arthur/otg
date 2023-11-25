import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";

const routes: Routes = [{
	path: '',
	component: MainComponent
}]
@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [MainComponent]
})

export class MainModule {}