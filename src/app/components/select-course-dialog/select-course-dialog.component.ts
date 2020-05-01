import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CourseProviderService} from '../../services/course-provider.service';
import {MetaData} from '../../models/meta-data';

@Component({
  selector: 'app-select-course-dialog',
  templateUrl: './select-course-dialog.component.html',
  styleUrls: ['./select-course-dialog.component.scss']
})
export class SelectCourseDialogComponent implements OnInit {

  @Output() selectCourseEvent = new EventEmitter<number>();

  metaData: MetaData[];
  currentSelectionIndex: number = 0;

  constructor(private dialogRef: MatDialogRef<SelectCourseDialogComponent>, private courseProvider: CourseProviderService) { }

  ngOnInit(): void {
    this.metaData = this.courseProvider.getMetaData();
  }

  selectCourse() {
    //TODO: Setup Confirmation!
    this.selectCourseEvent.emit(this.currentSelectionIndex);
    this.closePopup();
  }

  closePopup() {
    this.dialogRef.close();
  }
}
