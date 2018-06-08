import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiErrorMessage } from '../../common/model/api-error-message';
import { ApiError } from '../../common/model/api-error';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { ViewChild } from '@angular/core/src/metadata/di';
import { Location } from '@angular/common';
import { UpdateComponent } from 'src/app/common/entity/update/update.component';
import { Field } from 'src/app/common/model/field';

@Component({
  selector: 'app-update-employee',
  templateUrl: '../../common/entity/update/update.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent extends UpdateComponent<Employee> {

  constructor(employeeService: EmployeeService<Employee>, router: Router, route: ActivatedRoute, location: Location, snackBar: MatSnackBar) {
    super(employeeService, router, route, location, snackBar);
  }

  getFields(): Field[] {
    return [new Field('firstName', null, null), new Field('lastName', null, null), new Field('email', null, null), new Field('dob', 'Date Of Birth', 'date')];
  }


}
