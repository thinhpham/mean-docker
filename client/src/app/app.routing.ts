import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './feature/hero/dashboard.component';
import { HeroesComponent } from './feature/hero/heroes.component';
import { HeroDetailComponent } from './feature/hero/hero-detail.component';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { WikipediaSearchComponent } from './feature/wikipedia/wikipedia-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detail/:_id', component: HeroDetailComponent, canActivate: [AuthGuard] },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'lazy', loadChildren: './feature/lazy/lazy.module#LazyModule', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'settings', loadChildren: './feature/settings/settings.module#SettingsModule', canActivate: [AuthGuard] },
  { path: 'wikipedia', component: WikipediaSearchComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
