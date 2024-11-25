import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionAsignaturaPage } from './gestion-asignatura.page';

describe('GestionAsignaturaPage', () => {
  let component: GestionAsignaturaPage;
  let fixture: ComponentFixture<GestionAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
