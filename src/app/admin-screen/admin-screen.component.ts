import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { Observable } from 'rxjs';

interface Administrator {
  id: number;
  name: string;
  email: string;
}

interface AdministratorResponse {
  status: string;
}

interface EnrollmentRequest {
  id: number;
  student: number;
  course: number;
  approved: boolean;
  approved_by: number;
  approval_reason: string;
  approval_date: string;
}

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class AdminScreenComponent implements OnInit {
  administrators: Administrator[] = [];
  enrollmentRequests: EnrollmentRequest[] = [];
  adminForm: FormGroup;
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) {
    this.adminForm = new FormGroup({ 
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getAdministrators().subscribe((administrators: Administrator[]) => {
      this.administrators = administrators;
    });
    this.getEnrollmentRequests().subscribe((requests: EnrollmentRequest[]) => {  // Add this line
      this.enrollmentRequests = requests;  // Add this line
    });  // Add this line
  }

  getEnrollmentRequests(): Observable<EnrollmentRequest[]> {  // Add this method
    return this.http.get<EnrollmentRequest[]>(`${this.apiUrl}/api/enrollmentrequests`);
  }

  reviewRequest(request: EnrollmentRequest) {
    if (request.id !== undefined) {
        this.router.navigate(['/review', request.id]);
    } else {
        console.error('request.id is undefined');
    }
  }

  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${this.apiUrl}/api/administrators`);
  }

  createAdministrator(email: string, password: string) {
    this.http.post<AdministratorResponse>(`${this.apiUrl}/api/administrators/create_administrator/`, { email, password })
      .subscribe(response => {
        if (response.status === 'Administrator created successfully') {
          alert('Administrator has been created!');
          this.getAdministrators().subscribe((administrators: Administrator[]) => {  // Add this line
            this.administrators = administrators;  // Add this line
          });  // Add this line
        } else {
          alert(response.status);
        }
      }, error => {
        console.error(error);
      });
  }
  
  deleteAdministrator(administrator: Administrator) {
    this.http.delete(`${this.apiUrl}/api/administrators/${administrator.id}/delete_administrator/`).subscribe(
      response => {
        console.log(response);
        this.getAdministrators().subscribe((administrators: Administrator[]) => {  // Add this line
          this.administrators = administrators;  // Add this line
        });  // Add this line
      },
      error => {
        console.error(error);
      }
    );
  }
  
}
