import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontactpopupComponent } from './editcontactpopup.component';

describe('EditcontactpopupComponent', () => {
  let component: EditcontactpopupComponent;
  let fixture: ComponentFixture<EditcontactpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcontactpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcontactpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
