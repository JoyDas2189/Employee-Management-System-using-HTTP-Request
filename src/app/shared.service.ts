import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private formDataSubject = new BehaviorSubject<any>(null);

  formData$ = this.formDataSubject.asObservable();

  setFormData(data: any) {
    this.formDataSubject.next(data);
  }

  constructor() { }
}
