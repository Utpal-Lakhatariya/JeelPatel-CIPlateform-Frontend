import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMissionComponent } from './header-mission.component';

describe('HeaderMissionComponent', () => {
  let component: HeaderMissionComponent;
  let fixture: ComponentFixture<HeaderMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
