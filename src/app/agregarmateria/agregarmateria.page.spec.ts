import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarmateriaPage } from './agregarmateria.page';

describe('AgregarmateriaPage', () => {
  let component: AgregarmateriaPage;
  let fixture: ComponentFixture<AgregarmateriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarmateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
