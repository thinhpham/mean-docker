import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component'
import { SecurityComponent } from './security.component'
import { ProfileComponent } from './profile.component'
import { NotificationComponent } from './notification.component'

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'security', pathMatch: 'full' },
      { path: 'security', component: SecurityComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'notification', component: NotificationComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);