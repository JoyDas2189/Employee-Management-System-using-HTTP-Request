import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmloyeeInformationService {
  private apiUrl = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get(this.apiUrl);
  }

  getEmployee(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  updateEmployee(id: any, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
  }
  
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
