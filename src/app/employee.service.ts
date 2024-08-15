import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/employee';

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

  deleteEmployee(id: any) {
    const deleteUrl = `http://localhost:3000/employee/${id}`;
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
    id: any,
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
    const updateUrl = `http://localhost:3000/employee/${id}`;
    return this.http.put(updateUrl, employee);
  }

  getEmployee(id: any) {
    return this.http.get(`http://localhost:3000/employee/${id}`);
  }
  getEmployeeById(id: any) {
    return this.http.get(`http://localhost:3000/employee/${id}`);
  }
}
