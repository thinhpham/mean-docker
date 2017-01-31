import { NgModule } from '@angular/core';

import { routing } from './lazy.routing';
import { LazyComponent } from './lazy.component';
import { LazyChildOneComponent } from './lazy-child-one.component';
import { LazyChildTwoComponent } from './lazy-child-two.component';

@NgModule({
  imports: [routing],
  declarations: [LazyComponent, LazyChildOneComponent, LazyChildTwoComponent]
})
export class LazyModule { }