import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthenticationService) { }
 
    canActivate() {
        if (this.auth.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}