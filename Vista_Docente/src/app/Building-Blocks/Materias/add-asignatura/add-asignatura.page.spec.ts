import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAsignaturaPage } from './add-asignatura.page';

describe('AddAsignaturaPage', () => {
  let component: AddAsignaturaPage;
  let fixture: ComponentFixture<AddAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
