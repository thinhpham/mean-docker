import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [NavComponent, SpinnerComponent],
  declarations: [NavComponent, SpinnerComponent],
  providers: [AuthenticationService, LoggerService, SpinnerService]
})
export class CoreModule { }