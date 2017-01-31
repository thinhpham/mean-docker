import { Inject, Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { IAppConfig } from '../../iapp.config';
import { APP_CONFIG } from '../../app.config';
import { Hero } from '../../models/hero';
import { AuthenticationService } from '../../core/authentication.service';

@Injectable()
export class HeroSearchService {
  private serviceUrl = `${this.config.apiEndpoint}/heroes`;
  private headers = new Headers({ 'Content-Type': 'application/json', 'X-Access-Token': this.authenticationService.token });
  private options = new RequestOptions({ headers: this.headers });

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http, private authenticationService: AuthenticationService) { }

  search(term: string): Observable<Hero[]> {
    const url = `${this.serviceUrl}?name=${term}`;

    return this.http
      .get(url, this.options)
      .map((res: Response) => {
        return res.json() as Hero[];
      });
  }
}