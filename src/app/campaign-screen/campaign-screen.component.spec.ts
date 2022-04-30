import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignScreenComponent } from './campaign-screen.component';

describe('CampaignScreenComponent', () => {
  let component: CampaignScreenComponent;
  let fixture: ComponentFixture<CampaignScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
