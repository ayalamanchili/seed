import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../common/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  user: User;
  appurl: string = 'http://localhost:8080/portal/services/login';

  login(user: User) {
    console.log(user);
    return this.http.post<User>(this.appurl, user)
      .pipe(map((res: User) => {
        console.log(res);
        console.log(res.token);
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res));
        return res;
      }))
  };


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

}
