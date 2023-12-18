import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AdminLoginResponse {
  token: string;
  status: string;
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.http.post<AdminLoginResponse>('http://localhost:8000/api/administrators/login/', this.loginForm.value).subscribe(
        response => {
          console.log(response);
          //localStorage.setItem('token', response.token);
          this.router.navigate(['/admin']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
