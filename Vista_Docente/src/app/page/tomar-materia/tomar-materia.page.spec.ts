import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomarMateriaPage } from './tomar-materia.page';

describe('TomarMateriaPage', () => {
  let component: TomarMateriaPage;
  let fixture: ComponentFixture<TomarMateriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarMateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
