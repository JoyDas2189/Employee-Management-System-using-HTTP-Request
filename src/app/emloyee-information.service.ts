import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmloyeeInformationService {
  private apiUrl = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) {}

  getEmployees():Observable<any>{
    return this.http.get<any>('http://localhost:3000/employee');
  }

  getEmployee(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/employee/${id}`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/employee', employee);
  }

  updateEmployee(id: any, employee: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/employee/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/employee/${id}`);
  }
}
