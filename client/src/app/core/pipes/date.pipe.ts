import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
	transform(value: string): string {
		moment.locale('uk');

		return moment(value).format('D MMMM, YYYY');
	}
}
