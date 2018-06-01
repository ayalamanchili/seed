import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { Routes, RouterModule } from '@angular/router';
import { RoutesMap } from './router/routes-map';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule, MatListModule, MatMenuModule, MatCardModule, MatGridListModule, MatButtonModule, MatSelectModule, MatIconModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './common/auth/auth.guard';
import { AuthService } from './common/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './common/auth/auth-interceptor';

@NgModule({
  declarations: [
    MyNavComponent,
    EmployeeListComponent,
    DashboardComponent,
    LoginComponent

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
    MatTableModule,
    RouterModule.forRoot(RoutesMap),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [AuthGuard, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [MyNavComponent]
})
export class AppModule { }
