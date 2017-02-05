import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../core/authentication.service';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    error = '';

    constructor(private router: Router, private location: Location, private authenticationService: AuthenticationService) { }

    ngOnInit(): void { 
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
    }
}