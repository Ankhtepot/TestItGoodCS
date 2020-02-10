import {EventEmitter, Injectable} from '@angular/core';
import {Course} from './shared/model/course.model';
import {CoursesProvider} from './shared/courses-provider';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private selectedCourseId: string = null;
  private selectedCourse: Course = null;
  private courses: Course[] = null;
  private coursesProvider: CoursesProvider = null;

  selectedCourseIdChanged = new EventEmitter<string>();

  constructor() {
    this.coursesProvider = new CoursesProvider();
    this.courses = this.coursesProvider.getCourses();
    this.coursesProvider.loadCoursesForGroup('engeto');
  }

  loadCourses(groupName: string)
  {}

  getCourses() {
    return this.coursesProvider.getCourses();
  }

  getSelectedCourse(): Course {
    return this.selectedCourse;
  }

  setSelectedCourseId(selectedCourseId: string) {
    this.selectedCourseId = selectedCourseId;
    this.selectedCourse = this.getCourseById(selectedCourseId);
    this.selectedCourseIdChanged.emit(this.selectedCourseId);
  }

  getCourseById(id: string): Course {
    let foundCourse: Course = null;
    this.courses.forEach(course => {
      if (course.id === id) {
        foundCourse = JSON.parse(JSON.stringify(course));
      }
    });

    return foundCourse;
  }

  getSelectedCourseTests() {
    return JSON.parse(JSON.stringify(this.selectedCourse.tests));
  }
}
