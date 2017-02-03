import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from './user.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user => this.user = user);
  }

  save(): void {
    this.userService.update(this.user);
  }
}