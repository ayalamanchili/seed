
import { EmployeeListComponent } from '../employees/employee-list/employee-list.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { LoginComponent } from '../login/login.component';
import { CreateEmployeeComponent } from '../employees/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from '../employees/update-employee/update-employee.component';
import { EmployeesComponent } from '../employees/employees.component';
export const RoutesMap = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'employees',
        canActivate: [AuthGuard],
        component: EmployeesComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: "create",
                component: CreateEmployeeComponent, pathMatch: 'full'
            },
            {
                path: "update/:id",
                component: UpdateEmployeeComponent
            },
            {
                path: "list",
                component: EmployeeListComponent
            }
        ]
    },
    {
        path: "create",
        component: CreateEmployeeComponent, pathMatch: 'full'
    },
    {
        path: "login",
        component: LoginComponent
    }
]