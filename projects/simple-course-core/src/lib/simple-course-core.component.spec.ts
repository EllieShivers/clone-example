import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCourseCoreComponent } from './simple-course-core.component';

describe('SimpleCourseCoreComponent', () => {
  let component: SimpleCourseCoreComponent;
  let fixture: ComponentFixture<SimpleCourseCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleCourseCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCourseCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
