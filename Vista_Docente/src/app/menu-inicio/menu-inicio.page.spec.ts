import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuInicioPage } from './menu-inicio.page';

describe('MenuInicioPage', () => {
  let component: MenuInicioPage;
  let fixture: ComponentFixture<MenuInicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
