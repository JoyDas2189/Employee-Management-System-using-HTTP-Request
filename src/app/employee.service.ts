import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl =
    'https://angularlearn-b8615-default-rtdb.firebaseio.com/employees.json';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get(this.baseUrl).pipe(
      map((res) => {
        let emps = [];
        for (let id in res) {
          emps.push({ ...res[id], id });
        }
        return emps;
      })
    );
  }

  deleteEmployee(id: string) {
    const deleteUrl = `https://angularlearn-b8615-default-rtdb.firebaseio.com/employees/${id}.json`;
    return this.http.delete(deleteUrl);
  }

  addEmployee(employee: {
    eName: string;
    eDob: Date;
    eEmail: string;
    ePosition: string;
    eLocation: string;
    ePostal: number;
    eCity: string;
  }) {
    return this.http.post(this.baseUrl, employee);
  }

  updateEmployee(
    id: string,
    employee: {
      eName: string;
      eDob: Date;
      eEmail: string;
      ePosition: string;
      eLocation: string;
      ePostal: number;
      eCity: string;
    }
  ) {
    const updateUrl = `https://angularlearn-b8615-default-rtdb.firebaseio.com/employees/${id}.json`;
    return this.http.put(updateUrl, employee);
  }

  getEmployee(employeeId: string) {
    return this.http.get(`https://angularlearn-b8615-default-rtdb.firebaseio.com/employees/${employeeId}.json`);
  }
  
}
