import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { DateFormattingService } from 'src/app/services/date-formatting/date-formatting.service';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';
import { ProductApiService } from 'src/app/core/http/product-api.service';
import { ProductFormComponent } from './product-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  let mockProductApiService = jasmine.createSpyObj('ProductApiService', ['getProductById', 'addProduct', 'updateProduct']);
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '123', // simulate product ID
      },
    },
  };
  let mockCustomAlertService = jasmine.createSpyObj('CustomAlertService', ['showAlert']);
  let mockDateFormattingService = jasmine.createSpyObj('DateFormattingService', ['formatDate']);
  let mockFormValidationService = jasmine.createSpyObj('FormValidationService', ['validateCurrentOrFutureDate', 'dateRevisionAfterDateReleaseValidator', 'dateNotPast']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      providers: [
        FormBuilder,
        { provide: ProductApiService, useValue: mockProductApiService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CustomAlertService, useValue: mockCustomAlertService },
        { provide: DateFormattingService, useValue: mockDateFormattingService },
        { provide: FormValidationService, useValue: mockFormValidationService },
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA] 
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

