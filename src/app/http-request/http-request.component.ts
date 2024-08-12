import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-http-request',
  templateUrl: './http-request.component.html',
  styleUrl: './http-request.component.css',
})
export class HttpRequestComponent implements OnInit {
  allEmployees: any[] = [];
  emps: any;
  @ViewChild('productForm') form: NgForm;

  constructor(private httpRequest: HttpClient) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.httpRequest
      .get(
        'https://angularlearn-b8615-default-rtdb.firebaseio.com/employees.json'
      )
      .pipe(
        map((res) => {
          let emps = [];
          for (let id in res) {
            emps.push({ ...res[id], id });
          }
          return emps;
        })
      )
      .subscribe((res) => {
        this.emps = res;
        console.log(res);
      });
  }
  deleteEmployee(id: string) {
    this.httpRequest
      .delete(
        `https://angularlearn-b8615-default-rtdb.firebaseio.com/employees/${id}.json`
      )
      .subscribe((res) => {
        this.getEmployees();
        console.log(res);
      });
  }

  editEmployee(id: string) {
    let currentEmpoyee = this.emps.find((p) => {
      return p.id === id;
    });
    console.log(currentEmpoyee);
  }

  onProductCreate(employees: {
    eName: string;
    eAge: number;
    eEmail: string;
    ePosition: string;
    elocation: string;
    ePostal: number;
    eCity: string;
  }) {
    console.log(employees);
    const headers = new HttpHeaders({ myHeader: 'Joy header' });
    this.httpRequest
      .post<{ eName: string }>(
        'https://angularlearn-b8615-default-rtdb.firebaseio.com/employees.json',
        employees,
        { headers: headers }
      )
      .subscribe((res) => {
        this.getEmployees();
      });
  }
}
