import { TestBed } from '@angular/core/testing';
import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { CustomAlertService } from './custom-alert.service';

describe('CustomAlertService', () => {
  let service: CustomAlertService;
  let mockComponentFactoryResolver: jasmine.SpyObj<ComponentFactoryResolver>;
  let mockApplicationRef: jasmine.SpyObj<ApplicationRef>;
  let mockInjector: jasmine.SpyObj<Injector>;

  beforeEach(() => {
    mockComponentFactoryResolver = jasmine.createSpyObj('ComponentFactoryResolver', ['resolveComponentFactory']);
    mockApplicationRef = jasmine.createSpyObj('ApplicationRef', ['attachView', 'detachView']);
    mockInjector = jasmine.createSpyObj('Injector', ['get']);

    TestBed.configureTestingModule({
      providers: [
        CustomAlertService,
        { provide: ComponentFactoryResolver, useValue: mockComponentFactoryResolver },
        { provide: ApplicationRef, useValue: mockApplicationRef },
        { provide: Injector, useValue: mockInjector },
      ]
    });

    service = TestBed.inject(CustomAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
