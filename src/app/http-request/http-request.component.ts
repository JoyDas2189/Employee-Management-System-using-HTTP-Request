import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-http-request',
  templateUrl: './http-request.component.html',
  styleUrl: './http-request.component.css',
})
export class HttpRequestComponent implements OnInit {
  allEmployees: any[] = [];
  emps: any = null;
  id = '';
  editMode: boolean = false;
  editingEmployeeId: string | null = null;
  employeeId: any;
  employee: any;
  user : any;
  
  @ViewChild('employeeForm') form: NgForm;

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((res) => {
      this.id = res['id'];
      if (this.id) {
        this.editMode = true;
      }
    });
  }

  // ngOnInit(): void {
  //   this.getEmployees();
  // }

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

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params['id'];
    if (this.employeeId) {
      this.editMode = true;
      this.editingEmployeeId = this.employeeId;
      this.employeeService
        .getEmployee(this.employeeId)
        .subscribe((employees) => {
          this.user = employees;
          this.form.setValue({
            eName: this.user.eName,
            eDob: this.user.eDob,
            eEmail: this.user.eEmail,
            ePosition: this.user.ePosition,
            eLocation: this.user.eLocation,
            ePostal: this.user.ePostal,
            eCity: this.user.eCity,
            eSalary: this.user.eSalary,
          });
        });
    } else {
      this.editMode = false;
    }
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
      console.log(this.form.value);
      this.employeeService.addEmployee(this.form.value).subscribe(() => {
        this.getEmployees();
        this.form.reset();
      });
    }
  }
}
