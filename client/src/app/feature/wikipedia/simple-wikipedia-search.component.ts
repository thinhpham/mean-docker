import { Component } from '@angular/core';
import { WikipediaSearchService } from './wikipedia-search.service';

@Component({
  selector: 'toh-simple-wikipedia-search',
  template: `
    <div>
      <h3>Simple Search</h3>
      <input #term type="text" (keyup)="search(term.value)" placeholder="Enter any term to search" class="form-control input-lg">
      <ul>
        <li *ngFor="let item of items">{{item}}</li>
      </ul>
    </div>  
  `
})
export class SimpleWikipediaSearchComponent {
  items: Array<string>;
  
  constructor(private wikipediaSearchService: WikipediaSearchService) {}
  
  search(term) {
    this.wikipediaSearchService.search(term).then(items => this.items = items);
  }  
}