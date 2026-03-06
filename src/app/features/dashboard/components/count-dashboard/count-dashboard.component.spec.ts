import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDashboardComponent } from './count-dashboard.component';

describe('CountDashboardComponent', () => {
  let component: CountDashboardComponent;
  let fixture: ComponentFixture<CountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
