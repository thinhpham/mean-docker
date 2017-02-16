import { Component } from '@angular/core';
import { WikipediaSearchService } from './wikipedia-search.service';

@Component({
  selector: 'toh-simple-wikipedia-search',
  templateUrl: './simple-wikipedia-search.component.html',
  styleUrls: ['./simple-wikipedia-search.component.css']
})
export class SimpleWikipediaSearchComponent {
  items: Array<string>;
  
  constructor(private wikipediaSearchService: WikipediaSearchService) {}
  
  search(term) {
    this.wikipediaSearchService.search(term).then(items => this.items = items);
  }  
}