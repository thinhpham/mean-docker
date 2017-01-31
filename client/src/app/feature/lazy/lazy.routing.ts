import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';
import { LazyChildOneComponent } from './lazy-child-one.component';
import { LazyChildTwoComponent } from './lazy-child-two.component';

const routes: Routes = [
  { path: '', component: LazyComponent },
  { path: 'lazychildone', component: LazyChildOneComponent },
  { path: 'lazychildtwo', component: LazyChildTwoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);