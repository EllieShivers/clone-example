import {EventEmitter, Injectable} from '@angular/core';
import {Course} from '../../../projects/simple-course-core/src/lib/models/course';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {CourseMapperService} from './course-mapper.service';
import {HttpClient} from '@angular/common/http';
import Manifest from '../../assets/courses/Manifest.json';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CourseProviderService {

  constructor(private courseMapper: CourseMapperService, private http: HttpClient) {
  }

  private manifest = Manifest;
  private courseStrings: string[] = this.manifest.courses;

  public getCourseFromManifest(courseIndex: number): Promise<any> {
    if (courseIndex >= this.courseStrings.length) throwError('Requested Course Index Out of Bounds');

    let newCourse: any = '';
    let fileName: string = this.courseStrings[courseIndex];
    return this.http.get('assets/courses/' + fileName + '.anc', {responseType: 'text'}).toPromise();
  }

}
