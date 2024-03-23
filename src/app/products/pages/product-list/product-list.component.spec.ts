import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductApiService } from 'src/app/core/http/product-api.service';
import { Router } from '@angular/router';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { ProductFilterService } from 'src/app/services/product-filter/product-filter.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

class MockProductApiService {
  getProducts = jasmine.createSpy().and.returnValue(of([{ /* Mock product data */ }]));
  deleteProduct = jasmine.createSpy().and.returnValue(of({}));
}

class MockRouter {
  navigate = jasmine.createSpy();
}

class MockCustomAlertService {
  showAlert = jasmine.createSpy().and.returnValue(Promise.resolve(true));
}

class MockProductFilterService {
  filterProducts = jasmine.createSpy().and.callFake(products => products);
}

class MockPaginationService {
  setItemsPerPage = jasmine.createSpy();
  calculateTotalPages = jasmine.createSpy();
  paginateProducts = jasmine.createSpy().and.callFake(products => products);
  getTotalPages = jasmine.createSpy().and.returnValue(1);
  getCurrentPage = jasmine.createSpy().and.returnValue(1);
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductApiService: MockProductApiService;
  let mockRouter: MockRouter;
  let mockCustomAlertService: MockCustomAlertService;
  let mockProductFilterService: MockProductFilterService;
  let mockPaginationService: MockPaginationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductApiService, useClass: MockProductApiService },
        { provide: Router, useClass: MockRouter },
        { provide: CustomAlertService, useClass: MockCustomAlertService },
        { provide: ProductFilterService, useClass: MockProductFilterService },
        { provide: PaginationService, useClass: MockPaginationService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    mockProductApiService = TestBed.inject(ProductApiService) as any;
    mockRouter = TestBed.inject(Router) as any;
    mockCustomAlertService = TestBed.inject(CustomAlertService) as any;
    mockProductFilterService = TestBed.inject(ProductFilterService) as any;
    mockPaginationService = TestBed.inject(PaginationService) as any;

    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init and apply filters', fakeAsync(() => {
    expect(mockProductApiService.getProducts).toHaveBeenCalled();
    tick();
    expect(component.products.length).toBeGreaterThan(0); 
    expect(mockPaginationService.paginateProducts).toHaveBeenCalled();
  }));

});
