import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CustomMenuComponent } from './custom-menu.component';

describe('CustomMenuComponent', () => {
  let component: CustomMenuComponent;
  let fixture: ComponentFixture<CustomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility', () => {
    expect(component.isMenuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should display menu items when menu is open', () => {
    component.menuItems = [
      { text: 'Item 1', action: () => { } },
      { text: 'Item 2', action: () => { } }
    ];
    component.toggleMenu();
    fixture.detectChanges();

    const menuItems = fixture.debugElement.queryAll(By.css('.menu-content div'));
    expect(menuItems.length).toEqual(2);
    expect(menuItems[0].nativeElement.textContent.trim()).toEqual('Item 1');
    expect(menuItems[1].nativeElement.textContent.trim()).toEqual('Item 2');
  });

  it('should call the action function of a selected item', () => {
    const actionSpy = jasmine.createSpy('actionSpy');
    component.menuItems = [{ text: 'Item', action: actionSpy }];
    component.toggleMenu(); // Open the menu to make items selectable
    fixture.detectChanges();

    component.selectItem(component.menuItems[0].action);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should close the menu after selecting an item', () => {
    component.menuItems = [{ text: 'Item', action: () => { } }];
    component.toggleMenu(); // Open the menu
    fixture.detectChanges();

    component.selectItem(component.menuItems[0].action);
    expect(component.isMenuOpen).toBeFalse();
  });
});
