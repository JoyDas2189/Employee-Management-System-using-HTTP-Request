import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-http-request',
  templateUrl: './http-request.component.html',
  styleUrl: './http-request.component.css',
})
export class HttpRequestComponent implements OnInit {
  allEmployees: any[] = [];
  emps: any;
  editMode: boolean = false;
  editingEmployeeId: string | null = null;
  @ViewChild('employeeForm') form: NgForm;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.emps = res;
      console.log(res);
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe((res) => {
      this.getEmployees();
      console.log(res);
    });
  }

  editEmployee(id: string) {
    let currentEmpoyee = this.emps.find((p: any) => {
      return p.id === id;
    });
    this.form.setValue({
      eName: currentEmpoyee.eName,
      eDob: currentEmpoyee.eDob,
      eEmail: currentEmpoyee.eEmail,
      ePosition: currentEmpoyee.ePosition,
      eLocation: currentEmpoyee.eLocation,
      ePostal: currentEmpoyee.ePostal,
      eCity: currentEmpoyee.eCity,
      eSalary: currentEmpoyee.eSalary,
    });
    this.editMode = true;
    this.editingEmployeeId = id;
  }

  onEmployeeAdd(employees: {
    eName: string;
    eDob: Date;
    eEmail: string;
    ePosition: string;
    eLocation: string;
    ePostal: number;
    eCity: string;
    eSalary: number;
  }) {
    if (this.editMode && this.editingEmployeeId) {
      this.employeeService
        .updateEmployee(this.editingEmployeeId, employees)
        .subscribe(() => {
          this.getEmployees();
          this.editMode = false;
          this.editingEmployeeId = null;
          this.form.reset();
        });
    } else {
      this.employeeService.addEmployee(employees).subscribe(() => {
        this.getEmployees();
        this.form.reset();
      });
    }
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
}
