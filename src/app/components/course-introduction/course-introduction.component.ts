import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../models/course';

@Component({
  selector: 'app-course-introduction',
  templateUrl: './course-introduction.component.html',
  styleUrls: ['./course-introduction.component.scss']
})
export class CourseIntroductionComponent implements OnInit {

  @Input() currentCourse: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
