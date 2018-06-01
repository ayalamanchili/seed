
import { EmployeeListComponent } from '../employees/employee-list/employee-list.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { LoginComponent } from '../login/login.component';
export const RoutesMap = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'employees',
        canActivate: [AuthGuard],
        component: EmployeeListComponent
    },
    {
        path: "login",
        component: LoginComponent
    }
]