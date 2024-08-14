import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  reactiveForm: FormGroup;
  submittedData: any;
  submitted = false;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      eName: new FormControl('', Validators.required),
      eDob: new FormControl('', Validators.required),
      eEmail: new FormControl('', [Validators.required, Validators.email]),
      ePosition: new FormControl('', Validators.required),
      eLocation: new FormControl('', Validators.required),
      ePostal: new FormControl('', Validators.required),
      eCity: new FormControl('', Validators.required),
      eSalary: new FormControl('', Validators.required),
      skills: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  // get skills(): FormArray {
  //   return this.reactiveForm.get('skills') as FormArray;
  // }

  // addSkill() {
  //   this.skills.push(this.fb.control('', Validators.required));
  // }
  // removeSkill(index: number) {
  //   this.skills.removeAt(index);
  // }
  // editEmployee() {
  //   this.reactiveForm.patchValue(this.submittedData);
  //   this.submitted = false;
  // }

  clearForm() {
    this.reactiveForm.reset({
      eName: 'joy',
      eDob: '2001-10-27',
      eEmail: 'jy@gmail.com',
      ePosition: 'intern',
      eLocation: 'sutrapur',
      ePostal: '1100',
      eCity: 'dhaka',
      eSalary: '100',
      skills: this.fb.array(['angular']),
    });
    this.submittedData = '';
    this.submitted = false;
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      this.submittedData = this.reactiveForm.value;
      this.submitted = true;
    }
  }
}
