import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/guest/main/main.component';
import { NewsComponent } from './pages/guest/news/news.component';
import { PhotosComponent } from './pages/guest/photos/photos.component';
import { ContactsComponent } from './pages/guest/contacts/contacts.component';
import { AnnouncementComponent } from './pages/guest/announcement/announcement.component';
import { PublicInfoComponent } from './pages/guest/public-info/public-info.component';
import { GeneralComponent } from './pages/guest/general/general.component';
import { SignComponent } from './pages/admin/sign/sign.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './core/components/admin-panel/admin-panel.component';
import { NgxTinymceModule } from 'ngx-tinymce';

const routes: Routes = [{
	path: '',
	// canActivate: [Guest]
	component: MainComponent
}, {
	path: 'admin',
	component: SignComponent
}]

@NgModule({
	declarations: [
		AppComponent,
		GeneralComponent,
		NewsComponent,
		PhotosComponent,
		ContactsComponent,
		AnnouncementComponent,
		PublicInfoComponent,
		MainComponent,
		SignComponent,
		AdminPanelComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		}),
		FormsModule,
		HttpClientModule,
		NgxTinymceModule.forRoot({
			baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
		})
	],
	providers: [],
	bootstrap: [AppComponent],
	exports: [MainComponent]
})
export class AppModule { }
