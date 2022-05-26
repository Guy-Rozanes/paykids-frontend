import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumWelcomeComponent } from './premium-welcome.component';

describe('PremiumWelcomeComponent', () => {
  let component: PremiumWelcomeComponent;
  let fixture: ComponentFixture<PremiumWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
