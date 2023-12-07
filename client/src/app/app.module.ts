import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/guest/main/main.component';
import { SignComponent } from './pages/guest/sign/sign.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxTinymceModule } from 'ngx-tinymce';
import { PostsComponent } from './core/components/posts/posts.component';
import { WacomModule } from 'wacom';
import { CreatePostComponent } from './core/modals/create-post/create-post.component';
import { DateFormatPipe } from './core/pipes/date.pipe';
import { CreateRequestComponent } from './core/modals/create-request/create-request.component';
import { PhoneComponent } from './core/components/phone/phone.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PostPanelComponent } from './core/components/post-panel/post-panel.component';
import { AdminPanelComponent } from './pages/admin/panel/admin-panel.component';
import { AdminRequestsComponent } from './core/components/admin-requests/admin-requests.component';
import { CreateAdministrativeServiceComponent } from './core/modals/create-administrative-service/create-administrative-service.component';

const routes: Routes = [{
	path: '',
	// canActivate: [Guest]
	component: MainComponent
}, {
	path: 'sign',
	component: SignComponent
}, {
	path: 'admin',
	component: AdminPanelComponent
}]

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		SignComponent,
		PostPanelComponent,
		PostsComponent,
		CreatePostComponent,
		DateFormatPipe,
		CreateRequestComponent,
		PhoneComponent,
		AdminPanelComponent,
		AdminRequestsComponent,
		CreateAdministrativeServiceComponent
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
					createPost: CreatePostComponent,
					createRequest: CreateRequestComponent,
					createAdministrativeService: CreateAdministrativeServiceComponent
				}
			}
		}),
		NgxMaskDirective,
		NgxMaskPipe
	],
	providers: [provideNgxMask()],
	bootstrap: [AppComponent],
	exports: [MainComponent]
})
export class AppModule { }
