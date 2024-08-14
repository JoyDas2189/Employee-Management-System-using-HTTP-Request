import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  employees: any[] = [];
  emps: any;
  totalEmployees: number = 0;
  averageSalary: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employees = res;
      this.totalEmployees = this.employees.length;
      this.averageSalary = this.calculateAverageSalary();
    })
  }

  calculateAverageSalary() {
    const totalSalary = this.employees.reduce((sum, emp) => sum + emp.eSalary, 0);

    return totalSalary / this.totalEmployees;
  }

  
  openFormComponent() {
    this.router.navigate(['employeeForm']);
  }

  openInfoComponent() {
    this.router.navigate(['employeeInformation']);
  }
}
