import { Component } from '@angular/core';

@Component({
  template: `
  <p>Lazy component only load when clicked by the user</p>
  <ul>
    <li><a routerLink="lazychildone">Child one</a></li>
    <li><a routerLink="lazychildtwo">Child two</a></li>
  </ul>
  `
})
export class LazyComponent { }