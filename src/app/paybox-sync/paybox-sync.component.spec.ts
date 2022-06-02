import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayboxSyncComponent } from './paybox-sync.component';

describe('PayboxSyncComponent', () => {
  let component: PayboxSyncComponent;
  let fixture: ComponentFixture<PayboxSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayboxSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayboxSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
