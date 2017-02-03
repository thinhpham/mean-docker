import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

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

    login(email: string, password: string): Promise<boolean> {
        const url = `${this.serviceUrl}/authenticate`;
        const json = JSON.stringify({ email: email, password: password });

        return this.http.post(url, JSON.stringify({ email: email, password: password }), { headers: this.headers })
            .toPromise()
            .then(response => {
                this.token = response.json().token;
                localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
                return true;
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}