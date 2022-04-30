import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSavingComponent } from './assign-saving.component';

describe('AssignSavingComponent', () => {
  let component: AssignSavingComponent;
  let fixture: ComponentFixture<AssignSavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSavingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
