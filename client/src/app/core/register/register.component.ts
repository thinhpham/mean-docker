import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../core/authentication.service';
import { SettingsService } from '../../features/settings/settings.service';
import { User } from '../../models/user';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    error = '';
    success = '';
    user: FormGroup;

    constructor(
        private location: Location, 
        private builder: FormBuilder, 
        private settings: SettingsService,
        private auth: AuthenticationService
    ) { }

    ngOnInit(): void { 
        this.user = this.builder.group({
            firstName: [''],
            lastName: ['',],
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    goBack(): void {
        this.location.back();
    }

    save({ value, valid }: { value: User, valid: boolean }): void {
        if (valid) {
            this.settings.registerNewUser(value)
                .then(user => {
                    this.success = 'User is registered successfully. You can now login.';
                    this.error = '';
                })
                .catch(error => {
                    this.success = '';
                    this.error = error;
                });
        }
    }
}