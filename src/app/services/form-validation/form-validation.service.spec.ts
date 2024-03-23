import { TestBed } from '@angular/core/testing';
import { FormValidationService } from './form-validation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidationService]
    });
    service = TestBed.inject(FormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('dateRevisionAfterDateReleaseValidator should validate dateRevision is after dateRelease', () => {
    const formGroup = new FormGroup({
      date_release: new FormControl('2020-01-01'),
      date_revision: new FormControl('2020-01-02')
    }, { validators: service.dateRevisionAfterDateReleaseValidator() });

    expect(formGroup.valid).toBeTruthy();
    formGroup.controls['date_revision'].setValue('2019-12-31');
    expect(formGroup.valid).toBeFalsy();
    expect(formGroup.errors).toEqual({ 'revisionAfterRelease': true });
  });

  it('validateCurrentOrFutureDate should validate date is current or future', () => {
    const futureDate = new FormControl('2999-01-01');
    expect(service.validateCurrentOrFutureDate()(futureDate)).toBeNull();
    const pastDate = new FormControl('1999-01-01');
    expect(service.validateCurrentOrFutureDate()(pastDate)).toEqual({ 'dateNotFuture': true });
  });


  it('dateNotPast should set error on past date control within a FormGroup', () => {
    const formGroup = new FormGroup({
      testDate: new FormControl()
    });

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    formGroup.controls['testDate'].setValue(yesterday.toISOString().split('T')[0]);
    service.dateNotPast('testDate')(formGroup);

    expect(formGroup.get('testDate')?.errors).toEqual({ 'dateNotPast': true });

    formGroup.controls['testDate'].setValue(today.toISOString().split('T')[0]);
    service.dateNotPast('testDate')(formGroup);
    expect(formGroup.get('testDate')?.errors).toBeNull();
  });

});
