import { Injectable } from '@angular/core';

export interface Service {
	title: string;
	id: number;
	extract: boolean;
}

export interface Category extends Omit<Service, 'extract'> {
	children: Service[];
}
@Injectable({
	providedIn: 'root'
})
export class ConfigService {

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

	administrativeServices: Category[] = [
		{
			title: 'Довідки та витяги',
			id: 0,
			children: [
				{
					title: 'Витяг з реєстру застрахованих осіб',
					id: 0,
					extract: true
				},
				{
					title: 'Витяг про нормативну грошову оцінку',
					id: 1,
					extract: true
				},
				{
					title: 'Витяг про земельну ділянку',
					id: 2,
					extract: true
				},
				{
					title: 'Довідка про відсутність судимості',
					id: 3,
					extract: true
				}
			]
		},
		{
			title: 'Наколишнє середовище',
			id: 1,
			children: [
				{
					title: 'Декларація про відходи',
					id: 0,
					extract: true
				},
				{
					title: 'Дозвіл на водокористування',
					id: 1,
					extract: true
				}
			]
		},
		{
			title: 'Безпека та правопорядок',
			id: 2,
			children: [
				{
					title: 'Перевірка автоперевізника',
					id: 0,
					extract: false
				},
				{
					title: 'Довідка про відсутність судимості',
					id: 1,
					extract: true
				}
			]
		},
		{
			title: `Сім'я`,
			id: 3,
			children: [
				{
					title: 'Допомога при народженні дитини',
					id: 0,
					extract: false
				},
				{
					title: 'Реєстрація місця проживання дитини',
					id: 1,
					extract: false
				}
			]
		},
		{
			title: 'Пенсії, пільги та допомога',
			id: 4,
			children: [
				{
					title: 'Отримання статусу безробітнього',
					id: 0,
					extract: true
				},
				{
					title: 'Довідка з Реєстру застрахованих осіб',
					id: 1,
					extract: true
				},
				{
					title: 'Допомога при народженні дитини',
					id: 2,
					extract: true
				}
			]
		},
		{
			title: 'Транспорт',
			id: 5,
			children: [
				{
					title: 'Ліцензія на послуги з автоперевезень',
					id: 0,
					extract: true
				},
				{
					title: 'Перевірка автоперевізника',
					id: 1,
					extract: true
				},
				{
					title: 'Замовлення індивідуального номерного знака',
					id: 2,
					extract: true
				},
				{
					title: 'Відновлення та обмін посвідчення водія',
					id: 3,
					extract: true
				},
				{
					title: 'Призначення належного користувача',
					id: 4,
					extract: true
				},
				{
					title: 'Бронювання дозволів на міжнародні перевезення',
					id: 5,
					extract: true
				}
			]
		},
		{
			title: 'Ліцензії та дозволи',
			id: 6,
			children: [
				{
					title: 'Ліцензія з противопожежної діяльності',
					id: 0,
					extract: true
				},
				{
					title: 'Ліцензія на послуги з автоперевезень',
					id: 1,
					extract: true
				},
				{
					title: 'Дозвіл на водокористування',
					id: 2,
					extract: true
				},
				{
					title: 'Ліцензія на виробництво ліків',
					id: 3,
					extract: true
				},
				{
					title: 'Бронювання дозволів на міжнародні перевезення',
					id: 4,
					extract: true
				},
				{
					title: 'Ліцензія на імпорт ліків',
					id: 5,
					extract: true
				},
				{
					title: 'Ліцензія на продаж лікарських засобів',
					id: 6,
					extract: true
				},
				{
					title: 'Дозвіл на виконання будівельних робів',
					id: 7,
					extract: true
				},
				{
					title: 'Внесення змін у дозвіл на виконання будівельних робіт',
					id: 8,
					extract: true
				},
				{
					title: `Сертифікат про прийняття об'єкта в експлуатацію`,
					id: 9,
					extract: true
				}
			]
		},
		{
			title: 'Підприємництво',
			id: 7,
			children: [
				{
					title: 'Відкриття ФОП',
					id: 0,
					extract: true
				},
				{
					title: 'Внесення змін про ФОП',
					id: 1,
					extract: true
				},
				{
					title: 'Закриття ФОП',
					id: 2,
					extract: true
				},
				{
					title: 'Підписання документів',
					id: 3,
					extract: true
				},
				{
					title: 'Декларування зміни цін на товари',
					id: 4,
					extract: true
				},
				{
					title: 'Реєстрація ТОВ на підставі модельного статуту',
					id: 5,
					extract: true
				},
				{
					title: 'Перехід юридичної особи на діяльність на підставі модельного статуту',
					id: 6,
					extract: true
				}
			]
		}
	]
}
