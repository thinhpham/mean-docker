import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../core/authentication.service';

@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    id = '';
    error = '';
    success = '';
    reset: FormGroup;

    constructor(
        private location: Location, 
        private builder: FormBuilder, 
        private route: ActivatedRoute, 
        private auth: AuthenticationService
    ) { }

    ngOnInit(): void { 
        this.reset = this.builder.group({
            email: ['', [Validators.required, Validators.minLength(2)]],
            password: ['', [Validators.required, Validators.minLength(2)]],
            confirm: ['', [Validators.required, Validators.minLength(2)]]
        });

        this.route.params
            .subscribe((params: Params) => this.id = params['id']);
    }

    goBack(): void {
        this.location.back();
    }

    save({ value, valid }: { value: any, valid: boolean }): void {
        if (this.id) {
            this.auth.setNewPassword(this.id, value.password, value.confirm)
                .then(result => {
                    this.success = result.message;
                    this.error = '';
                })
                .catch(error => {
                    this.success = '';
                    this.error = error._body;
                });
        } else {
            this.auth.resetPassword(value.email)
                .then(result => {
                    this.success = result.message;
                    this.error = '';
                })
                .catch(error => {
                    this.success = '';
                    this.error = error._body;
                });
        }
    }
}