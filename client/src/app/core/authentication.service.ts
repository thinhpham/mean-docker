import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { IAppConfig } from '../iapp.config';
import { APP_CONFIG } from '../app.config';
import { User } from '../models/user';

import { Utils } from '../shared/utils';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private serviceUrl = `${this.config.apiEndpoint}`;
    private jwtHelper = new JwtHelper();
    public token: string;
    public decodedToken: any;

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
        this.token = localStorage.getItem('id_token');
        this.decodedToken = this.token && this.jwtHelper.decodeToken(this.token);
    }

    login(email: string, password: string): Promise<boolean> {
        const url = `${this.serviceUrl}/authenticate`;

        return this.http.post(url, JSON.stringify({ email: email, password: password }), { headers: this.headers })
            .toPromise()
            .then(response => {
                this.token = response.json().token;
                this.decodedToken = this.token && this.jwtHelper.decodeToken(this.token);
                localStorage.setItem('id_token', this.token);
                return true;
            })
            .catch(response => {
                this.token = null;
                this.decodedToken = null;
                localStorage.removeItem('id_token');
                return false;
            });
    }

    logout(): void {
        this.token = null;
        this.decodedToken = null;
        localStorage.removeItem('id_token');
    }

    loggedIn(): boolean {
        return tokenNotExpired();
    }

    resetPassword(email: string): Promise<boolean> {
        const url = `${this.serviceUrl}/reset-password/request`;

        return this.http.post(url, JSON.stringify({ email: email }), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(Utils.handleError);
    }
}