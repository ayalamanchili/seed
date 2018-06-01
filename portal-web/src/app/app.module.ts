import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { Routes, RouterModule } from '@angular/router';
import { RoutesMap } from './router/routes-map';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule, MatListModule, MatMenuModule, MatCardModule, MatGridListModule, MatButtonModule, MatSelectModule, MatIconModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatSnackBarModule, MatProgressBar } from '@angular/material';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './common/auth/auth.guard';
import { AuthService } from './common/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './common/auth/auth-interceptor';
import { LoaderInterceptor } from './common/loader/loader-interceptor';
import { LoaderService } from 'src/app/common/loader/loader.service';
import { LoaderComponent } from 'src/app/common/loader/loader.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [
    MyNavComponent,
    EmployeeListComponent,
    DashboardComponent,
    LoginComponent,
    LoaderComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(RoutesMap)
  ],
  providers: [AuthGuard, AuthService, LoaderService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }],
  bootstrap: [MyNavComponent]
})
export class AppModule { }
