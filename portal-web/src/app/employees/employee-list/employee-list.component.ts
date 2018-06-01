import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ReadAll } from '../../common/entity/read-all';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'employees/employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent extends ReadAll<Employee> implements OnInit {

  constructor(employeeService: EmployeeService<Employee>, snackBar: MatSnackBar) {
    super(employeeService, snackBar);
  }

  getDisplayedColumns(): string[] {
    return ['action', 'firstName', 'lastName', 'email', 'dob'];
  }

}
