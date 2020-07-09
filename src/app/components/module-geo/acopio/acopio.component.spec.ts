import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcopioComponent } from './acopio.component';

describe('AcopioComponent', () => {
  let component: AcopioComponent;
  let fixture: ComponentFixture<AcopioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcopioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcopioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
