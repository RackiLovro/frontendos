import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component'; 
import { RegisterComponent } from './register/register.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { StudentScreenComponent } from './student-screen/student-screen.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AdminScreenComponent } from './admin-screen/admin-screen.component';
import { ReviewScreenComponent } from './review-screen/review-screen.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'admin/login', component: AdminLoginComponent }, 
    { path: 'register', component: RegisterComponent },
    { path: 'course/:id', component: CourseDetailsComponent },
    { path: 'review/:id', component: ReviewScreenComponent },
    { path: 'student', component: StudentScreenComponent },
    { path: 'admin', component: AdminScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
