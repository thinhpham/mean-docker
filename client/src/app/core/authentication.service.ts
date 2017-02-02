import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'

import { IAppConfig } from '../iapp.config';
import { APP_CONFIG } from '../app.config';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private serviceUrl = `${this.config.apiEndpoint}`;
    public token: string;

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
        var storageUser = localStorage.getItem('currentUser');
        if (storageUser) {
            var currentUser = JSON.parse(storageUser);
            if (currentUser)
                this.token = currentUser.token;
        }
    }

    login(email: string, password: string): Observable<boolean> {
        const url = `${this.serviceUrl}/authenticate`;
        const json = JSON.stringify({ email: email, password: password });

        return this.http.post(url, JSON.stringify({ email: email, password: password }), { headers: this.headers })
            .map((response: Response) => {
                let respJson = response.json();
                if (respJson) {
                    let token = respJson.token;
                    if (token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({ token: token }));
                        return true;
                    }
                }

                return false;
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}