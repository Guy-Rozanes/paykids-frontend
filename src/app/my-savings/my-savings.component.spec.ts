import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySavingsComponent } from './my-savings.component';

describe('MySavingsComponent', () => {
  let component: MySavingsComponent;
  let fixture: ComponentFixture<MySavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
