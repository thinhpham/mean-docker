import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { IAppConfig } from '../../iapp.config';
import { APP_CONFIG } from '../../app.config';
import { Hero } from '../../models/hero';
import { AuthenticationService } from '../../core/authentication.service';

import { Utils } from '../../shared/utils';

@Injectable()
export class HeroService {
  private serviceUrl = `${this.config.apiEndpoint}/heroes`;
  private options = Utils.createRequestOptions(this.auth.token);

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http, private auth: AuthenticationService) { }

  getAll(): Promise<Hero[]> {
    const url = `${this.serviceUrl}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  get(id: string): Promise<Hero> {
    const url = `${this.serviceUrl}/${id}`;

    return this.http
      .get(url, this.options)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.serviceUrl}/${id}`;

    return this.http
      .delete(url, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string, age: number): Promise<Hero> {
    const url = `${this.serviceUrl}`;

    return this.http
      .post(url, JSON.stringify({ name: name, age: age }), this.options)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.serviceUrl}/${hero._id}`;

    return this.http
      .put(url, JSON.stringify(hero), this.options)
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}