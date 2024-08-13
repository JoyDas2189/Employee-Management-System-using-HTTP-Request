import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpRequestComponent } from './http-request/http-request.component';
import { ErrorComponent } from './error/error.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';

const routes: Routes = [
  { path: '', redirectTo: '/employeeForm', pathMatch: 'full' },
  { path: 'employeeForm', component: HttpRequestComponent },
  { path: 'employeeInformation', component: EmployeeInformationComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
