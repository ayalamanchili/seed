import { Component, OnInit } from '@angular/core';
import { User } from '../common/model/user';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiErrorMessage } from '../common/model/api-error-message';
import { ApiError } from '../common/model/api-error';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../common/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginServiceUrl = 'http://localhost:8080/portal/service/login';
  user = new User();
  returnUrl: string;
  validationErrors: ApiErrorMessage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
    this.user= new User();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  save() {
    this.authService.login(this.user)
      .subscribe(
      data => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        console.log(error);
        // this.alertService.error(error);
      });
  }

  handleValidationErrors(error: HttpErrorResponse) {
    var apiError: ApiError = error.error;
    if (apiError.status === 'BAD_REQUEST') {
      console.log('val rrors');
      this.validationErrors = apiError.errors;
    } else {
      //TODO other errors like 500,timeout etc...
    }

  }

  getMessage(key: string) {
    if (this.isValid()) {
      //TODO return hint
      return null;
    } else {
      for (let errMsg of this.validationErrors) {
        if (errMsg.key === key) {
          return errMsg.message;
        }
      }
    }
  }

  getMessageClass(key: string) {
    if (this.validationErrors && this.validationErrors.length > 0) {
      for (let errMsg of this.validationErrors) {
        if (errMsg.key === key) {
          return "mat-error";
        }
      }
    }
    return "mat-hint";
  }

  isValid() {
    if (this.validationErrors && this.validationErrors.length > 0) {
      return false;
    } else {
      return true;
    }
  }

}
