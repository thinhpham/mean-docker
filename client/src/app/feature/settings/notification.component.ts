import { Component } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from './user.service';

@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent { 
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  save(): void {
    this.userService.update(this.user);
  }
}