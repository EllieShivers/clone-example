import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseIntroductionComponent } from './course-introduction.component';

describe('CourseIntroductionComponent', () => {
  let component: CourseIntroductionComponent;
  let fixture: ComponentFixture<CourseIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
