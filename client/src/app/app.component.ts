import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  isAuthenticated(): Boolean {
    return (typeof this.authenticationService.token != 'undefined' && this.authenticationService.token !== null);
  }
}