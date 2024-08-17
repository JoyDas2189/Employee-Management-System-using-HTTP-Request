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

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.employeeInformationService.getEmployee(id).subscribe((user) => {
        console.log('Fetched Employee:', user);
        this.submittedData = user;
        this.eSkills.clear();
        if (user.eSkills && user.eSkills.length > 0) {
          user.eSkills.forEach((skill: string) => {
            this.eSkills.push(new FormControl(skill, Validators.required));
          });
        } else {
          this.eSkills.push(new FormControl('', Validators.required));
        }
        this.reactiveForm.setValue({
          eName: user.eName,
          eDob: user.eDob,
          eEmail: user.eEmail,
          ePosition: user.ePosition,
          eAddress: {
            eLocation: user.eAddress.eLocation,
            ePostal: user.eAddress.ePostal,
            eCity: user.eAddress.eCity,
          },
          eSalary: user.eSalary,
          eSkills: user.eSkills || [''],
        });
      });
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
      console.log('Form Data:', this.reactiveForm.value);

      if (this.submittedData?.id) {
        console.log('Updating Employee ID with : ', this.submittedData.id);
        this.employeeInformationService
          .updateEmployee(this.submittedData.id, this.reactiveForm.value)
          .subscribe((data) => {
            console.log('Updated Employee Data:', data);
            this.submittedData = data;
            this.sharedService.setFormData(this.reactiveForm.value);
            this.submitted = true;
            this.resetForm(data);
            this.router.navigate(['employeeInformation', this.submittedData.id]);
          });
      } else {
        this.employeeInformationService
          .addEmployee(this.reactiveForm.value)
          .subscribe((data) => {
            this.submittedData = data;
            this.sharedService.setFormData(this.reactiveForm.value);
            this.submitted = true;
            this.resetForm();
            this.router.navigate(['employeeInformation', this.submittedData.id]);
          });
      }
    }
  }

  resetForm(data?: any) {
    this.reactiveForm.reset();
    this.eSkills.clear();

    this.reactiveForm.setValue({
      eName: data?.eName || '',
      eDob: data?.eDob || '',
      eEmail: data?.eEmail || '',
      ePosition: data?.ePosition || '',
      eAddress: {
        eLocation: data?.eAddress.eLocation || '',
        ePostal: data?.eAddress.ePostal || '',
        eCity: data?.eAddress.eCity || '',
      },
      eSalary: data?.eSalary || '',
      eSkills: [],
    });
    if (data?.eSkills && data.eSkills.length > 0) {
      data.eSkills.forEach((skill: string) => {
        this.eSkills.push(new FormControl(skill, Validators.required));
      });
    } else {
      this.eSkills.push(new FormControl('', Validators.required));
    }
    this.submittedData = null;
    this.submitted = false;
  }
}
