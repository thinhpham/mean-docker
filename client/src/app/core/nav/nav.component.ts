import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'toh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(private auth: AuthenticationService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}