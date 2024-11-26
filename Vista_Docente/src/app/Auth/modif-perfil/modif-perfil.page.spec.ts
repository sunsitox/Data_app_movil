import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifPerfilPage } from './modif-perfil.page';

describe('ModifPerfilPage', () => {
  let component: ModifPerfilPage;
  let fixture: ComponentFixture<ModifPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
