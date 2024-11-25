import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabInicialPage } from './tab-inicial.page';

describe('TabInicialPage', () => {
  let component: TabInicialPage;
  let fixture: ComponentFixture<TabInicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
