import { Component, OnInit } from '@angular/core';
import {Course} from '../../../projects/simple-course-core/src/lib/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  opened: boolean = true;
  course: Course;

  constructor() { }

  ngOnInit(): void {

  }

  openUnitNavBar() {
    this.opened = !this.opened;
  }

  goToNext() {

  }
  goToPrev() {

  }

}
