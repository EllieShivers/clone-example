import {AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CourseProviderService} from '../../services/course-provider.service';
import {Course} from '../../models/course';
import {Unit} from '../../models/unit';
import {Lesson} from '../../models/lesson';
import {throwError} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnChanges, AfterViewInit{
  @Input() currentCourse: Course;
  @Input() currentCoursePath: string;
  @ViewChild("menu") sideNavMenu: ElementRef;
  currentUnit: Unit;
  currentLesson: Lesson;
  currentUnitIndex: number = -1;
  currentLessonIndex: number = -1;
  lastLesson: Lesson;
  isLarge: boolean = true;
  opened: boolean;
  window;
  document;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngAfterViewInit(): void {
    this.isLarge = this.checkIfLarge();
    this.toggleMenu();
  }

  ngOnInit(): void {
    this.window = window;
    this.document = document;
  }
  ngOnChanges(): void {
    if (this.currentCourse) {
      let lastUnit = this.currentCourse.units[this.currentCourse.units.length - 1];
      this.lastLesson = lastUnit.lessons[lastUnit.lessons.length - 1];
    }
  }

  selectUnit(unitIndex: number) {
    if (unitIndex > -1 && unitIndex < this.currentCourse.units.length) {
      this.currentUnit = this.currentCourse.units[unitIndex];
      this.currentUnitIndex = unitIndex;
    }
    else if (unitIndex === -1) {
      this.currentLesson = undefined;
      this.currentUnit = undefined;
      this.currentUnitIndex = unitIndex;
      this.currentLessonIndex = -1
    }
    else {
      throwError("Unit Index Out of Bounds.");
    }
  }

  selectLesson(lessonIndex: number) {
    if (lessonIndex != -1) {
      this.currentLesson = this.currentUnit.lessons[lessonIndex];
      this.currentLessonIndex = lessonIndex;
    }
    else {
      this.currentLessonIndex = -1;
      this.currentLesson = undefined;
    }
  }

  goToNext() {
    if (this.currentLessonIndex != -1) {
      let lessons = this.currentUnit.lessons;
      let currentLessonIndex: number = lessons.findIndex(x => x === this.currentLesson);
      if (currentLessonIndex +1 < lessons.length) {
        this.selectLesson(currentLessonIndex + 1);
      }
      else {
        if (this.currentUnitIndex + 1 < this.currentCourse.units.length) {
          this.selectUnit(this.currentUnitIndex +1);
          this.selectLesson(0);
        }
      }
    }
    else if (this.currentLessonIndex === -1) {
      this.selectUnit(0);
      this.selectLesson(0);
    }
  }
  goToPrev() {
    if (this.currentUnitIndex != -1) {
    if (this.currentLessonIndex != 0) {
      this.selectLesson(this.currentLessonIndex-1);
    }
    else if (this.currentLessonIndex === 0 && this.currentUnitIndex !=0) {
      this.selectUnit(this.currentUnitIndex-1);
      this.selectLesson(this.currentUnit.lessons.length-1);
    }
    else if (this.currentLessonIndex === 0 && this.currentUnitIndex === 0) {
      this.selectUnit(-1);
    }}
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      this.goToNext();
    }
    else if (event.key === "ArrowLeft") {
      this.goToPrev();
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isLarge = this.checkIfLarge();
    this.toggleMenu();
  }

  checkIfLarge(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 599;
  }
  toggleMenu() {
    if (this.isLarge) {
      this.opened = true;
    } else {
      this.opened = false;
    }
  }
}
