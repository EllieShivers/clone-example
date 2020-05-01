import {Component, OnInit} from '@angular/core';
import {CourseMapperService} from './services/course-mapper.service';
import {HttpClient} from '@angular/common/http';
import {CourseProviderService} from './services/course-provider.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SelectCourseDialogComponent} from './components/select-course-dialog/select-course-dialog.component';
import {Course} from './models/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title: string = 'Animo';

  currentCourse: any = '';
  currentCoursePath: string = '';
  courses: Course[] = [];

  constructor(private courseMapper: CourseMapperService, private http: HttpClient, private courseProvider: CourseProviderService, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.subscribeToCourse(0);

    // TODO: If only one course in manifest remove select course buttons. Otherwise populate list.
  }

  subscribeToCourse(courseIndex: number): void {
    this.courseProvider.getCourseFromManifest(courseIndex).then((data) => {
        this.currentCourse = this.courseMapper.parseMarkdown(data);
        this.currentCoursePath = this.courseProvider.getCoursePath(courseIndex);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('Finally')
      );
  }

  openSelectCourseDialogue(): void {
      // TODO: course switching. Pop up window, select new course? Use nested?
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "300";
    dialogConfig.width = "50em";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(SelectCourseDialogComponent, dialogConfig);
    modalDialog.componentInstance.selectCourseEvent.subscribe(($e) => {
      this.subscribeToCourse($e);
    })
  }

}
