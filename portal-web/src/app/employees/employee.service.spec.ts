import { TestBed, inject } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { Employee } from 'src/app/employees/employee';

describe('EmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService<Employee>) => {
    expect(service).toBeTruthy();
  }));
});
