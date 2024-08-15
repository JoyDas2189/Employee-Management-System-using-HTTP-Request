import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmloyeeInformationService } from '../emloyee-information.service';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  reactiveForm: FormGroup;
  submittedData: any;
  submitted = false;
  emps: any = null;
  id = '';
  editMode = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private employeeInformationService: EmloyeeInformationService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      eName: new FormControl('', Validators.required),
      eDob: new FormControl('', Validators.required),
      eEmail: new FormControl('', [Validators.required, Validators.email]),
      ePosition: new FormControl('', Validators.required),
      eAddress: new FormGroup({
        eLocation: new FormControl('', Validators.required),
        ePostal: new FormControl('', Validators.required),
        eCity: new FormControl('', Validators.required),
      }),
      eSalary: new FormControl('', Validators.required),
      eSkills: new FormArray([new FormControl('', Validators.required)]),
    });

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editMode = true;
      this.employeeInformationService
        .getEmployee(this.id)
        .subscribe((employee) => {
          this.user = employee;
          this.reactiveForm.setValue({
            eName: this.user.eName,
            eDob: this.user.eDob,
            eEmail: this.user.eEmail,
            ePosition: this.user.ePosition,
            eAddress: {
              eLocation: this.user.eAddress.eLocation,
              ePostal: this.user.eAddress.ePostal,
              eCity: this.user.eAddress.eCity,
            },
            eSalary: this.user.eSalary,
            eSkills: this.user.eSkills || [''],
          });
        });
    } else {
      this.editMode = false;
      this.clearForm();
    }
  }

  clearForm() {
    this.reactiveForm.reset({
      eName: '',
      eDob: '',
      eEmail: '',
      ePosition: '',
      eAddress: {
        eLocation: '',
        ePostal: '',
        eCity: '',
      },
      eSalary: '',
      eSkills: this.fb.array(['']),
    });
    this.submittedData = null;
    this.submitted = false;
  }

  get eSkills(): FormArray {
    return this.reactiveForm.get('eSkills') as FormArray;
  }

  addSkill() {
    this.eSkills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.eSkills.removeAt(index);
  }

  editEmployee() {
    this.reactiveForm.patchValue(this.submittedData);
    this.submitted = false;
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      if (this.submittedData?.id) {
        this.employeeInformationService
          .updateEmployee(this.submittedData.id, this.reactiveForm.value)
          .subscribe((data) => {
            this.submittedData = data;
            this.sharedService.setFormData(this.reactiveForm.value);
            this.submitted = true;
          });
      } else {
        this.employeeInformationService
          .addEmployee(this.reactiveForm.value)
          .subscribe((data) => {
            this.submittedData = data;
            this.sharedService.setFormData(this.reactiveForm.value);
            this.submitted = true;
          });
      }
    }
  }
}
