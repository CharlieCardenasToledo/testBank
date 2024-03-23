import { TestBed } from '@angular/core/testing';
import { DateFormattingService } from './date-formatting.service';

describe('DateFormattingService', () => {
  let service: DateFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly format a Date object', () => {
    const date = new Date(2020, 0, 1); 
    expect(service.formatDate(date)).toEqual('2020-01-01');
  });

  it('should correctly format a date string', () => {
    const dateString = '2020-01-01';
    expect(service.formatDate(dateString)).toEqual('2020-01-01');
  });

  it('should add leading zeros to months and days', () => {
    const date = new Date(2020, 8, 9); 
    expect(service.formatDate(date)).toEqual('2020-09-09');
  });

  it('should correctly format a leap year date', () => {
    const date = new Date(2020, 1, 29); 
    expect(service.formatDate(date)).toEqual('2020-02-29');
  });

  it('should correctly format the last day of the month', () => {
    const date = new Date(2020, 2, 31); 
    expect(service.formatDate(date)).toEqual('2020-03-31');
  });
});
