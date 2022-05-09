import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankLoadingComponent } from './bank-loading.component';

describe('BankLoadingComponent', () => {
  let component: BankLoadingComponent;
  let fixture: ComponentFixture<BankLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
