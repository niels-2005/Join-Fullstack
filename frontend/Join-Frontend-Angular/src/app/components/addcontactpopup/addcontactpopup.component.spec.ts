import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontactpopupComponent } from './addcontactpopup.component';

describe('AddcontactpopupComponent', () => {
  let component: AddcontactpopupComponent;
  let fixture: ComponentFixture<AddcontactpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcontactpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcontactpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
