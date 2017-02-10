import { Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { IAppConfig } from '../../iapp.config';
import { APP_CONFIG } from '../../app.config';
import { AuthenticationService } from '../../core/authentication.service';

import { Notification } from '../../models/notification';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';

import { Utils } from '../../shared/utils';

@Injectable()
export class SettingsService {
  private serviceUrl = `${this.config.apiEndpoint}`;
  private options = Utils.createRequestOptions(this.auth.token);

  constructor( 
    @Inject(APP_CONFIG) private config: IAppConfig, 
    private http: Http, 
    private auth: AuthenticationService
  ) { }

  getNotification(userId: string): Promise<Notification> {
    const url = `${this.serviceUrl}/settings/notifications/${userId}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => response.json() as Notification)
      .catch(Utils.handleError);
  }

  createNotification(notification: Notification): Promise<Notification> {
    const url = `${this.serviceUrl}/settings/notifications`;

    return this.http
      .post(url, JSON.stringify(notification), this.options)
      .toPromise()
      .then(response => response.json() as Notification)
      .catch(Utils.handleError);
  }

  updateNotification(notification: Notification): Promise<Notification> {
    const url = `${this.serviceUrl}/settings/notifications`;

    return this.http
      .put(url, JSON.stringify(notification), this.options)
      .toPromise()
      .then(response => response.json() as Notification)
      .catch(Utils.handleError);
  }

  getProfile(userId: string): Promise<Profile> {
    const url = `${this.serviceUrl}/settings/profiles/${userId}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => response.json() as Profile)
      .catch(Utils.handleError);
  }

  createProfile(profile: Profile): Promise<Profile> {
    const url = `${this.serviceUrl}/settings/profiles`;

    return this.http
      .post(url, JSON.stringify(profile), this.options)
      .toPromise()
      .then(response => response.json() as Profile)
      .catch(Utils.handleError);
  }

  updateProfile(profile: Profile): Promise<Profile> {
    const url = `${this.serviceUrl}/settings/profiles`;

    return this.http
      .put(url, JSON.stringify(profile), this.options)
      .toPromise()
      .then(response => response.json() as Profile)
      .catch(Utils.handleError);
  }

  getCurrentUser(): Promise<User> {
    if (this.auth.decodedToken) {
      return this.getUser(this.auth.decodedToken.tokenId);
    }
  }

  getUser(id: string): Promise<User> {
    const url = `${this.serviceUrl}/settings/users/${id}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => {
        let user = response.json() as User;
        user.password = null;
        return user;
      })
      .catch(Utils.handleError);
  }

  createUser(user: User): Promise<User> {
    const url = `${this.serviceUrl}/settings/users`;

    return this.http
      .post(url, JSON.stringify(user), this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(Utils.handleError);
  }

  updateUser(user: User): Promise<User> {
    const url = `${this.serviceUrl}/settings/users/${user._id}`;

    return this.http
      .put(url, JSON.stringify(user), this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(Utils.handleError);
  }

  registerNewUser(user: User): Promise<User> {
    const url = `${this.serviceUrl}/register`;

    return this.http
      .post(url, JSON.stringify(user), this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(Utils.handleError);
  }
}