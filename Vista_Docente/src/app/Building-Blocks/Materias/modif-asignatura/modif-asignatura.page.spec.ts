import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifAsignaturaPage } from './modif-asignatura.page';

describe('ModifAsignaturaPage', () => {
  let component: ModifAsignaturaPage;
  let fixture: ComponentFixture<ModifAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
