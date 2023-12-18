import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScreenComponent } from './student-screen.component';

describe('StudentScreenComponent', () => {
  let component: StudentScreenComponent;
  let fixture: ComponentFixture<StudentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
