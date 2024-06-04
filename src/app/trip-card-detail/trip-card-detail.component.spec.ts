import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCardDetailComponent } from './trip-card-detail.component';

describe('TripCardDetailComponent', () => {
  let component: TripCardDetailComponent;
  let fixture: ComponentFixture<TripCardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TripCardDetailComponent]
    });
    fixture = TestBed.createComponent(TripCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
