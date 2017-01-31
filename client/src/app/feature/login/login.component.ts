import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../core/authentication.service';

@Component({
    selector: 'toh-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: any = {};
    loading = false;
    error = '';

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user.email, this.user.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}