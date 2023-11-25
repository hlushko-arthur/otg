import { Component } from "@angular/core";

@Component({
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent {
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
		height: 500,
	};

	content = '';

	close: () => void;

	onChange: (content: string) => void;

	createPost(): void {
		this.onChange(this.content);
		this.close();
	}
}