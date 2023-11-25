import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/guest/main/main.component';
import { SignComponent } from './pages/admin/sign/sign.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './core/components/admin-panel/admin-panel.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { PostsComponent } from './core/components/posts/posts.component';
import { WacomModule } from 'wacom';
import { CreatePostComponent } from './core/modals/create-post/create-post.component';
import { DateFormatPipe } from './core/pipes/date.pipe';

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
		MainComponent,
		SignComponent,
		AdminPanelComponent,
		PostsComponent,
		CreatePostComponent,
		DateFormatPipe
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
		}),
		WacomModule.forRoot({
			modal: {
				modals: {
					createPost: CreatePostComponent
				}
			}
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
	exports: [MainComponent]
})
export class AppModule { }
