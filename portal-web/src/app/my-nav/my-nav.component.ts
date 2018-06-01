import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../common/model/user';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
    map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  welcomeMessage(): string {
    if (localStorage.getItem('currentUser') != null) {
      let user: User = JSON.parse(localStorage.getItem('currentUser'));
      return "Welcome " + user.username;
    } else {
      return "";
    }
  }
  authLinkText(): string {
    if (localStorage.getItem('token') != null) {
      return "Logout";
    } else {
      return "Login";
    }
  }

  authLink(): string {
    return "login";
  }

}
