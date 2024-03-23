import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CustomAlertComponent } from './custom-alert.component';

describe('CustomAlertComponent', () => {
  let component: CustomAlertComponent;
  let fixture: ComponentFixture<CustomAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAlertComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the custom alert when showAlert is false', () => {
    component.showAlert = false;
    fixture.detectChanges();
    const alertElement = fixture.debugElement.query(By.css('.custom-alert'));
    expect(alertElement).toBeNull();
  });

  it('should display the custom alert when showAlert is true', () => {
    component.showAlert = true;
    fixture.detectChanges();
    const alertElement = fixture.debugElement.query(By.css('.custom-alert'));
    expect(alertElement).not.toBeNull();
  });

  it('should display the correct title, message, and icon', () => {
    component.showAlert = true;
    component.title = 'Test Title';
    component.message = 'Test Message';
    component.icon = 'test-icon-url';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.custom-alert-header h4')).nativeElement;
    const messageElement = fixture.debugElement.query(By.css('.custom-alert-body p')).nativeElement;
    const iconElement = fixture.debugElement.query(By.css('.custom-alert-icon')).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
    expect(messageElement.textContent).toContain('Test Message');
    expect(iconElement.getAttribute('src')).toBe('test-icon-url');
  });

  it('should emit true for isConfirmed when confirm button is clicked', () => {
    spyOn(component.result, 'emit');
    component.showAlert = true;
    fixture.detectChanges();
    const btnConfirm = fixture.debugElement.query(By.css('.btnConfirm')).nativeElement;
    btnConfirm.click();
    expect(component.result.emit).toHaveBeenCalledWith({ isConfirmed: true, isDenied: false });
  });

  it('should emit false for isConfirmed when deny button is clicked', () => {
    spyOn(component.result, 'emit');
    component.showAlert = true;
    component.showCancelButton = true; // Ensure cancel button is shown
    fixture.detectChanges();
    const btnDeny = fixture.debugElement.query(By.css('.btnDeny')).nativeElement;
    btnDeny.click();
    expect(component.result.emit).toHaveBeenCalledWith({ isConfirmed: false, isDenied: true });
  });
});
