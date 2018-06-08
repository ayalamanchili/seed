import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiErrorMessage } from '../../common/model/api-error-message';
import { ApiError } from '../../common/model/api-error';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Crud } from '../../common/entity/crud';
import { Create } from '../../common/entity/create';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
import { CreateComponent } from 'src/app/common/entity/create/create.component';
import { Field } from 'src/app/common/model/field';

@Component({
  selector: 'app-create-employee',
  templateUrl: '../../common/entity/create/create.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent<Employee> extends CreateComponent<Employee> {

  constructor(employeesService: EmployeeService<Employee>, router: Router, snackBar: MatSnackBar, location: Location) {
    super(employeesService, router, snackBar, location);
  }

  getFields(): Field[] {
    return [new Field('firstName', null, null), new Field('lastName', null, null), new Field('email', null, null), new Field('dob', 'Date Of Birth', 'date')];
  }
}
