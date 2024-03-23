import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormattingService {

  constructor() { }
  formatDate(date: string | Date): string {
    let d: Date;

    if (typeof date === 'string') {
      const parts = date.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
      const day = parseInt(parts[2], 10);
      d = new Date(year, month, day); // This ensures the date is treated as local time
    } else {
      d = new Date(date);
    }

    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
