import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check menuItems array is initialized', () => {
     expect(component.menuItems[0].name).toEqual('Home')
  });

  it('should check menuItem is rendered', () => {
      const el = fixture.nativeElement;
      const buttons = el.querySelectorAll('button')
    fixture.detectChanges();

    expect(buttons[0].textContent).toEqual('Flex Demo') // primeiro buttom fora do menuItems
    
    // testes com botões do menuItem
    expect(buttons[1].textContent).toEqual('Home')
    expect(buttons[2].textContent).toEqual('Gallery')
    expect(buttons[3].textContent).toEqual('About Us')
    expect(buttons[4].textContent).toEqual('Contact Us')

  });
});
