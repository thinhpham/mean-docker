import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SettingsModule } from '../feature/settings/settings.module';

import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, SettingsModule],
  exports: [NavComponent, SpinnerComponent],
  declarations: [LoginComponent, NavComponent, SpinnerComponent, RegisterComponent, ResetPasswordComponent],
  providers: [AuthenticationService, LoggerService, SpinnerService]
})
export class CoreModule { }