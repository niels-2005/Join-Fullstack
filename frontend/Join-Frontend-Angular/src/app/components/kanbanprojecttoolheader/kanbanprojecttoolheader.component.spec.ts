import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanprojecttoolheaderComponent } from './kanbanprojecttoolheader.component';

describe('KanbanprojecttoolheaderComponent', () => {
  let component: KanbanprojecttoolheaderComponent;
  let fixture: ComponentFixture<KanbanprojecttoolheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanprojecttoolheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanprojecttoolheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
