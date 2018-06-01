import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { CrudService } from '../common/entity/crud.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService<Employee> extends CrudService<Employee> {

  constructor(http: HttpClient) {
    super(http);
  }

  getURI(): string {
    return 'http://localhost:8080/portal/services/employees';
  }

}
