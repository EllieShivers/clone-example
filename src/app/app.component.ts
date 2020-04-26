import {Component, OnInit} from '@angular/core';
import {CourseMapperService} from './services/course-mapper.service';
import {Course} from '../../projects/simple-course-core/src/lib/models/course';
import {HttpClient} from '@angular/common/http';
import {CourseProviderService} from './services/course-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  themeClass: string;

  title: string = 'Animo';
  opened: boolean = false;
  currentCourse: any = '';
  courses: Course[] = [];

  constructor(private courseMapper: CourseMapperService, private http: HttpClient, private courseProvider: CourseProviderService) {

  }

  ngOnInit(): void {
    this.subscribeToCourse(0);

    // TODO: If only one course in manifest remove select course buttons. Otherwise populate list.
    /*
    // subscribe to some source of theme change events, then...
    this.themeClass = newThemeClass;

    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(newThemeClass);*/
  }

  subscribeToCourse(courseIndex: number): void {
    this.courseProvider.getCourseFromManifest(courseIndex).then((data) => {
        console.log('In Then');
        this.currentCourse = this.courseMapper.parseMarkdown(data);
        console.log(this.currentCourse.title);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('In Finally')
      );
  }

  openSelectCourseDialogue(): void {
      // TODO: course switching. Pop up window, select new course? Use nested?
  }
}
