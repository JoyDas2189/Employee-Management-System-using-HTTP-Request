import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrl: './employee-information.component.css',
})
export class EmployeeInformationComponent implements OnInit {
  employees: any;
  employeeId: any;
  employee: any;
  selectedEmployee: any = null;
  showDetails: boolean = false;
  user: any;

  constructor(
    private employeeServece: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.employeeServece.getEmployees().subscribe((data) => {
      this.employees = data;
    });

    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.employeeServece.getEmployee(this.employeeId).subscribe((user) => {
      this.user = user;
    });
  }
  calcuteAge(dob: string) {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  employeeDetails(id: string) {
    this.router.navigate(['employeeDetails', id]);
  }
  closeDetails() {
    this.showDetails = false;
  }

  editEmployee(id: string) {
    this.router.navigate(['employeeForm', id]);
  }
}
