import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';  // Import ActivatedRoute

interface EnrollmentRequest {
  id: number;
  student: number;
  course: number;
  approved: boolean;
  approved_by: number;
  approval_reason: string;
  approval_date: string;
}

interface ReviewResponse {
  status: string;
}

@Component({
  selector: 'app-review-screen',
  templateUrl: './review-screen.component.html',
  styleUrls: ['./review-screen.component.css'],
  imports: [
    FormsModule,
    CommonModule
  ],
  standalone: true,
})
export class ReviewScreenComponent implements OnInit {
  request: EnrollmentRequest | null = null;
  review = '';
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}  // Inject ActivatedRoute

  ngOnInit() {
    const requestId = this.route.snapshot.paramMap.get('id');
    this.http.get<EnrollmentRequest>(`${this.apiUrl}/api/enrollmentrequests/${requestId}`).subscribe(
      request => {
        this.request = request;
      },
      error => {
        console.error(error);
      }
    );
  }

  submitReview() {
    const adminId = 5;  // Replace with the actual ID of the administrator
    this.http.post<ReviewResponse>(`${this.apiUrl}/api/administrators/enroll_student/`, { 
      student_id: this.request?.student, 
      course_id: this.request?.course,
      admin_id: adminId, 
      approval_reason: this.review 
    })
    .subscribe(response => {
      if (response.status === 'Student enrolled in the course successfully') {
        alert('Review has been submitted!');
      } else {
        alert(response.status);
      }
    }, error => {
      console.error(error);
    });
  }  
  
}
