import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/hero/dashboard.component';
import { HeroesComponent } from './features/hero/heroes.component';
import { HeroDetailComponent } from './features/hero/hero-detail.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ResetPasswordComponent } from './core/reset-password/reset-password.component';
import { WikipediaSearchComponent } from './features/wikipedia/wikipedia-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard] },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'lazy', loadChildren: './features/lazy/lazy.module#LazyModule', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'settings', loadChildren: './features/settings/settings.module#SettingsModule', canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'wikipedia', component: WikipediaSearchComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
