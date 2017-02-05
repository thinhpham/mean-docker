import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [NavComponent, SpinnerComponent],
  declarations: [LoginComponent, NavComponent, SpinnerComponent, RegisterComponent, ResetPasswordComponent],
  providers: [AuthenticationService, LoggerService, SpinnerService]
})
export class CoreModule { }