import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskboardbuttonComponent } from './addtaskboardbutton.component';

describe('AddtaskboardbuttonComponent', () => {
  let component: AddtaskboardbuttonComponent;
  let fixture: ComponentFixture<AddtaskboardbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtaskboardbuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtaskboardbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
