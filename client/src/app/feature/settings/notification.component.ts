import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from './user.service';

@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit { 
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user => this.user = user);
  }

  save(): void {
    this.userService.update(this.user);
  }
}