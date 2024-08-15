import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpRequestComponent } from './http-request/http-request.component';
import { ErrorComponent } from './error/error.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employeeForm', component: EmployeeFormComponent },
  { path: 'employeeForm/:id', component: EmployeeFormComponent },
  { path: 'employeeInformation', component: EmployeeInformationComponent },
  { path: 'employeeDetails/:id', component: EmployeeDetailsComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
