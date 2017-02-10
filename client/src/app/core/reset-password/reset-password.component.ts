import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../core/authentication.service';

@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    error = '';
    success = '';
    reset: FormGroup;

    constructor(private location: Location, private fb: FormBuilder, private auth: AuthenticationService) {}

    ngOnInit(): void { 
        this.reset = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    goBack(): void {
        this.location.back();
    }

    save({ value, valid }: { value: any, valid: boolean }): void {
        if (valid) {
            this.auth.resetPassword(value.email)
                .then(user => {
                    this.success = 'Password reset have been submitted. Please check your email to continue.';
                    this.error = '';
                })
                .catch(error => {
                    this.success = '';
                    this.error = error;
                });
        }
    }
}