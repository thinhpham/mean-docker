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

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http, private authenticationService: AuthenticationService) { }

  getCurrentUser(): Promise<User> {
    if (this.authenticationService.token) {
      var jwt = new JwtHelper();
      return Promise.resolve(jwt.decodeToken(this.authenticationService.token) as User);
    }
  }

  get(id: string): Promise<User> {
    const url = `${this.serviceUrl}/${id}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.serviceUrl}/${user._id}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}