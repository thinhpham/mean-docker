import { Component, EventEmitter, Output } from '@angular/core';

import { LoggerService } from '../../core/logger.service';

@Component({
  selector: 'toh-filter-text',
  template: '<input type="text" id="filterText" [(ngModel)]="filter" (keyup)="filterChanged($event)" />'
})
export class FilterTextComponent {
  @Output() changed: EventEmitter<string>;

  filter: string;

  constructor(private logger: LoggerService) {
    this.changed = new EventEmitter<string>();
  }

  clear() {
    this.filter = '';
  }

  filterChanged(event: any) {
    event.preventDefault();
    this.logger.log(`Filter Changed: ${this.filter}`);
    this.changed.emit(this.filter);
  }
}