import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  student_id: number;
  status: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.http.post<LoginResponse>('http://localhost:8000/api/students/login/', this.loginForm.value).subscribe(
        response => {
          console.log(response);
          localStorage.setItem('token', response.token);  // Store the token
          localStorage.setItem('student_id', response.student_id.toString());  // Store the student_id
          this.router.navigate(['/student']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}  
