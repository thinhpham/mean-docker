import { Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

import { IAppConfig } from '../../iapp.config';
import { APP_CONFIG } from '../../app.config';
import { AuthenticationService } from '../../core/authentication.service';
import { User } from '../../models/user';

@Injectable()
export class UserService {
  private serviceUrl = `${this.config.apiEndpoint}/users`;
  private headers = new Headers({ 'Content-Type': 'application/json', 'X-Access-Token': this.authenticationService.token });
  private options = new RequestOptions({ headers: this.headers });

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http, private authenticationService: AuthenticationService) {
  }

  getCurrentUser(): User {
    if (this.authenticationService.token) {
      var helper = new JwtHelper();
      var decoded = helper.decodeToken(this.authenticationService.token);

      var user = new User();
      user._id = decoded._id;
      user.firstName = decoded.firstName;
      user.lastName = decoded.lastName;
      user.email = decoded.email;
      user.isAdmin = decoded.isAdmin;

      return user;
    }
  }

  get(id: string): Promise<User> {
    const url = `${this.serviceUrl}/${id}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => {
        let user = response.json() as User;
        return user;
      })
      .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.serviceUrl}/${user._id}`;
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => {
        let user = response.json() as User;
        return user;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}