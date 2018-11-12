import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartilhadoComponent } from './compartilhado.component';

describe('CompartilhadoComponent', () => {
  let component: CompartilhadoComponent;
  let fixture: ComponentFixture<CompartilhadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartilhadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartilhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
