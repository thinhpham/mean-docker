import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { User } from '../../models/user';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  error = '';
  success = '';
  user: User;

  constructor(private userService: SettingsService) { }

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .then(user => this.user = user)
      .catch(error => this.error = error);
  }

  save(): void {
    this.userService
      .updateUser(this.user)
      .then(user => this.success = 'Settings updated successfully')
      .catch(error => this.error = error);
  }
}