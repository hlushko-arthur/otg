import { Component } from "@angular/core";
import { PostService } from "../../services/post.service";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { NewPost } from "../../interfaces/post.interface";

@Component({
	selector: 'admin-panel',
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.scss'],
})

export class AdminPanelComponent {
	isAddNewPost = false;
	content = '';
	tinyConfig = {
		toolbar1: 'styleselect bullist numlist  preview fullscreen',
		toolbar2: 'undo redo forecolor backcolor bold italic alignleft aligncenter alignright alignjustify outdent indent link image  emoticons code table',
		plugins: [
			"advlist autolink table preview lists image charmap print hr anchor pagebreak code",
			"searchreplace wordcount visualblocks visualchars code fullscreen fullpage",
			"insertdatetime media nonbreaking save table directionality",
			"template paste textcolor colorpicker textpattern link"
		],
		font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',


		heme: "modern",
		theme_advanced_buttons2_add: 'spellchecker',
		spellchecker_languages: 'English=en',
		spellchecker_word_separator_chars: '\\s!\"#$%&amp;()*+,-./:;&lt;=&gt;?@[\]^_{|}',
		browser_spellcheck: true,
		menubar: false,
		language: "en",
		relative_urls: true,
		subfolder: "",
		cleanup_on_startup: false,
		trim_span_elements: false,
		verify_html: false,
		cleanup: false,
		convert_urls: false,
		inline_styles: true,
		valid_elements: "*[*]",
		extended_valid_elements: "*[*]",
		branding: false,
		image_uploadtab: true,
		height: 200,
	};

	constructor(private _post: PostService, private _activatedRoute: ActivatedRoute) { }

	createPost(): void {

		const post: NewPost = {
			type: this._activatedRoute.snapshot.queryParams['tab'],
			content: this.content,
			dateCreated: moment().format('YYYY-MM-DD')
		}
		this._post.create(post)
	}
}