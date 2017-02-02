import { Component } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from './user.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent { 
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  save(): void {
    this.userService.update(this.user);
  }
}