import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { CourseComponent } from './components/course/course.component';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import { LessonComponent } from './components/lesson/lesson.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SelectCourseDialogComponent } from './components/select-course-dialog/select-course-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { CourseIntroductionComponent } from './components/course-introduction/course-introduction.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    LessonComponent,
    SelectCourseDialogComponent,
    QuizComponent,
    QuestionComponent,
    CourseIntroductionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatDividerModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    ScrollingModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
