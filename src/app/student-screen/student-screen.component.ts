import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
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
  name: string;
  description: string;
  ects_points: number;
}

interface EnrollmentResponse {
  status: string;
}

@Component({
  selector: 'app-student-screen',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './student-screen.component.html',
  styleUrls: ['./student-screen.component.css']
})

export class StudentScreenComponent implements OnInit {
  courses: Course[] = [];
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) {} 

  ngOnInit() {
    this.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/api/courses`).pipe(
      map((courses: Course[]) => courses.map(course => ({...course, id: course.id}))),
      switchMap((courses: Course[]) => {
        const fetchLecturesObservables = courses.map(course =>
          this.http.get<Lecture[]>(`${this.apiUrl}/api/lectures/course/${course.id}`).pipe(
            map(lectures => ({...course, lectures}))
          )
        );
        return forkJoin(fetchLecturesObservables);
      })
    );
  }

  enrollInCourse(course: Course) {
    //const token = localStorage.getItem('token');
    const studentId = localStorage.getItem('student_id');  // Get the student's id from local storage
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.post<EnrollmentResponse>(`${this.apiUrl}/api/students/${studentId}/enroll/`, { course_id: course.id })
      .subscribe(response => {
        if (response.status === 'Enrollment request created') {
          alert('Enrollment request has been sent!');
        } else {
          alert(response.status);
        }
      }, error => {
        console.error(error);
      });
  }

  goToCourseDetails(course: Course) {
    this.router.navigate(['/course', course.id]);
  }
}
