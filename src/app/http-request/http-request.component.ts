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
      eAge: currentEmpoyee.eAge,
      eEmail: currentEmpoyee.eEmail,
      ePosition: currentEmpoyee.ePosition,
      eLocation: currentEmpoyee.eLocation,
      ePostal: currentEmpoyee.ePostal,
      eCity: currentEmpoyee.eCity,
    });
    this.editMode = true;
    this.editingEmployeeId = id;
  }

  onEmployeeAdd(employees: {
    eName: string;
    eAge: number;
    eEmail: string;
    ePosition: string;
    eLocation: string;
    ePostal: number;
    eCity: string;
  }) {
    if (this.editMode && this.editingEmployeeId) {
      this.employeeService
        .updateEmployee(this.editingEmployeeId, employees)
        .subscribe(() => {
          this.getEmployees();
          this.form.reset();
          this.editMode = false;
          this.editingEmployeeId = null;
        });
    } else {
      this.employeeService.addEmployee(employees).subscribe(() => {
        this.getEmployees();
        this.form.reset();
      });
    }
  }
}
