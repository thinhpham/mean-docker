import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { WikipediaSearchService } from './wikipedia-search.service';

@Component({
  selector: 'toh-smart-wikipedia-search',
  template: `
    <div>
      <h3>Smart Search</h3>
      <input type="text" [formControl]="term" placeholder="Enter any term to search" class="form-control input-lg">
      <ul>
        <li *ngFor="let item of items | async">{{item}}</li>
      </ul>
    </div>
  `
})
export class SmartWikipediaSearchComponent {
  items: Observable<Array<string>>;
  term = new FormControl();
  
  constructor(private wikipediaSearchService: WikipediaSearchService) {}
  
  ngOnInit() {
    this.items = this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.wikipediaSearchService.search(term));
  }
}