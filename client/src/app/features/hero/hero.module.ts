import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { DashboardComponent } from './dashboard.component';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { HeroSearchService } from './hero-search.service';

import { SimpleWikipediaSearchComponent } from '../wikipedia/simple-wikipedia-search.component';
import { SmartWikipediaSearchComponent } from '../wikipedia/smart-wikipedia-search.component';
import { WikipediaSearchComponent } from '../wikipedia/wikipedia-search.component';
import { WikipediaSearchService } from '../wikipedia/wikipedia-search.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, JsonpModule],
  declarations: [
    DashboardComponent, 
    HeroDetailComponent, 
    HeroSearchComponent, 
    HeroesComponent, 
    SimpleWikipediaSearchComponent,
    SmartWikipediaSearchComponent,
    WikipediaSearchComponent
  ],
  providers: [HeroService, HeroSearchService, WikipediaSearchService]
})
export class HeroModule { }