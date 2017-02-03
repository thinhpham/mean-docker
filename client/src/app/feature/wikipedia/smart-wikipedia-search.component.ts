import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { WikipediaSearchService } from './wikipedia-search.service';

@Component({
  selector: 'toh-smart-wikipedia-search',
  templateUrl: './smart-wikipedia-search.component.html',
  styleUrls: ['./smart-wikipedia-search.component.css']
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