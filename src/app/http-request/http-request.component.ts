import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-http-request',
  templateUrl: './http-request.component.html',
  styleUrl: './http-request.component.css',
})
export class HttpRequestComponent implements OnInit {
  allEmployees: any[] = [];
  emps;

  constructor(private httpRequest: HttpClient) {}

  ngOnInit(): void {
    // this.fetchEmployee();
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
          for (let key in res) {
            emps.push({ ...res[key], key });
          }
          return emps;
        })
      )
      .subscribe((res) => {
        this.emps = res;
      });
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
        // this.fetchEmployee(); // Refresh the list after adding a new employee
      });
  }

  // fetchEmployee() {
  //   this.httpRequest
  //     .get<{ [key: string]: any }>(
  //       'https://angularlearn-b8615-default-rtdb.firebaseio.com/employees.json'
  //     )
  //     .pipe(
  //       map((responseData) => {
  //         const employeesArray: any[] = [];
  //         for (const key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             employeesArray.push({ ...responseData[key], id: key });
  //           }
  //         }
  //         return employeesArray;
  //       })
  //     )
  //     .subscribe((employees) => {
  //       this.allEmployees = employees;
  //       console.log(this.allEmployees);
  //     });
  // }
}
