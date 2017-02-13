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
    error = '';

    constructor(private router: Router, private auth: AuthenticationService) { }

    ngOnInit() {
        this.auth.logout();
    }

    login() {
        this.auth
            .login(this.user.email, this.user.password)
            .then(response => {
                if (response) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.error = 'Username or password is incorrect';
                }
            });
    }
}