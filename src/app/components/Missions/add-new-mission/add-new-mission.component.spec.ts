import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMissionComponent } from './add-new-mission.component';

describe('AddNewMissionComponent', () => {
  let component: AddNewMissionComponent;
  let fixture: ComponentFixture<AddNewMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
