import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundbarComponent } from './groundbar.component';

describe('GroundbarComponent', () => {
  let component: GroundbarComponent;
  let fixture: ComponentFixture<GroundbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroundbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroundbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
