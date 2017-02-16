import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { routing } from './settings.routing';

import { SettingsComponent } from './settings.component';
import { NotificationComponent } from './notification.component';
import { ProfileComponent } from './profile.component';
import { SecurityComponent } from './security.component';

import { SettingsService } from './settings.service';

@NgModule({
    imports: [ CommonModule, FormsModule, routing],
    declarations: [ SettingsComponent, NotificationComponent, ProfileComponent, SecurityComponent ],
    providers: [ SettingsService ]
})
export class SettingsModule { }