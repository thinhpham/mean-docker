import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './settings.routing';

import { SettingsComponent } from './settings.component';
import { NotificationComponent } from './notification.component';
import { ProfileComponent } from './profile.component';
import { SecurityComponent } from './security.component';

import { ProfileService } from './profile.service';
import { UserService } from './user.service';

@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, routing],
    declarations: [ SettingsComponent, NotificationComponent, ProfileComponent, SecurityComponent ],
    providers: [ ProfileService, UserService ]
})
export class SettingsModule { }