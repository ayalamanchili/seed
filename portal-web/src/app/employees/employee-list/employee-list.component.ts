import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { MatSnackBar } from '@angular/material';
import { ReadAllComponent } from 'src/app/common/entity/read-all/read-all.component';

@Component({
  selector: 'employees/employee-list',
  templateUrl: '../../common/entity/read-all/read-all.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent extends ReadAllComponent<Employee> implements OnInit {

  constructor(employeeService: EmployeeService<Employee>, snackBar: MatSnackBar) {
    super(employeeService, snackBar);
  }

  getColumns(): string[] {
    return ['firstName', 'lastName', 'email', 'dob'];
  }

  getID(): string {
    return "employee";
  }
}
