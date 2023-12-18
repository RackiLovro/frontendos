import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface Course {
  id: number;
  name: string;
  quota: number;
  description: string;
  ects: number;
  lectures?: Lecture[];
}

interface Lecture {
  id: number;
  name: string;
  description: string;
  ects_points: number;
}

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  private apiUrl = 'http://localhost:8000';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId !== null) {
      this.getCourseDetails(courseId).subscribe((course) => {
        this.course = course;
      });
    }
  }

  getCourseDetails(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/api/courses/${id}`).pipe(
      switchMap((course: Course) =>
        this.http.get<Lecture[]>(`${this.apiUrl}/api/lectures/course/${course.id}`).pipe(
          map(lectures => ({...course, lectures}))
        )
      )
    );
  }
}
