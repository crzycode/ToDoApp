import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from './guards/auth.guard';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:'',component:TaskListComponent,canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'profile', component:UpdateProfileComponent,canActivate:[AuthGuard]},
  {path:'report', component:ReportComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
