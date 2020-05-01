import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {CourseMapperService} from './course-mapper.service';
import {HttpClient} from '@angular/common/http';
import Manifest from '../../assets/courses/Manifest.json';
import {MetaData} from '../models/meta-data';

@Injectable({
  providedIn: 'root'
})
export class CourseProviderService {

  //TODO: Set course here and get course subscription working.

  constructor(private courseMapper: CourseMapperService, private http: HttpClient) {
    this.generateMetaData();
  }

  private manifest = Manifest;
  private courseStrings: string[] = this.manifest.courses;
  private metaData: MetaData[] = [];

  public getCoursePath(courseIndex: number): string {
    return this.courseStrings[courseIndex];
  }
  public getCourseFromManifest(courseIndex: number): Promise<any> {
    if (courseIndex >= this.courseStrings.length) throwError('Requested Course Index Out of Bounds');
    let fileName: string = this.courseStrings[courseIndex];
    return this.readFile(fileName);
  }

  private generateMetaData() {
    for (let courseTitle of this.courseStrings) {
      this.readFile(courseTitle).then(data => {
        //let tempCourse: Course = this.courseMapper.parseMarkdown(data);
        let metaData: MetaData = this.courseMapper.parseMetaData(data);
        this.metaData.push(metaData);
      }).catch().finally();
    }
  }

  private readFile(fileName): Promise<any> {
    return this.http.get('assets/courses/' + fileName + '.anc', {responseType: 'text'}).toPromise()
  }

  public getMetaData(): MetaData[] {
    return this.metaData;
  }

}
