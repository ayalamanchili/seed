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
import { Update } from '../../common/entity/update';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent extends Update<Employee> {

  constructor(employeeService: EmployeeService<Employee>, router: Router, route: ActivatedRoute, location: Location, snackBar: MatSnackBar) {
    super(employeeService, router, route, location, snackBar);
  }

}
