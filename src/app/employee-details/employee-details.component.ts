import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EmloyeeInformationService } from '../emloyee-information.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeInformationService: EmloyeeInformationService
  ) {}

  calcuteAge(dob: string) {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  ngOnInit(): void {
    // this.employeeId = this.activatedRoute.snapshot.params['id'];
    // this.employeeInformationService.getEmployee(this.employeeId).subscribe((user) => {
    //   this.user = user;
    // });

    let id = this.activatedRoute.snapshot.params['id'];
    this.employeeInformationService.getEmployee(id).subscribe((user) => {
      this.user = user;
    });
  }
}
