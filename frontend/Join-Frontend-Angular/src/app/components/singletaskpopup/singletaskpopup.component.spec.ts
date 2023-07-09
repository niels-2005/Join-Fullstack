import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletaskpopupComponent } from './singletaskpopup.component';

describe('SingletaskpopupComponent', () => {
  let component: SingletaskpopupComponent;
  let fixture: ComponentFixture<SingletaskpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingletaskpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingletaskpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
