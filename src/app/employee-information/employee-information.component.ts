import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrl: './employee-information.component.css',
})
export class EmployeeInformationComponent implements OnInit {
  employees: any;

  selectedEmployee: any = null;
  showDetails: boolean = false;

  constructor(private employeeServece: EmployeeService) {}
  ngOnInit(): void {
    this.employeeServece.getEmployees().subscribe((data) => {
      this.employees = data;
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
  employeeDetails(employee: any) {
    this.selectedEmployee = employee;
    this.showDetails = true;
    console.log('Button Clicked');
  }
  closeDetails() {
    this.showDetails = false;
  }
}
