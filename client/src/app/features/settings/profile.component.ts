import { Component, OnInit } from '@angular/core';

import { Profile } from '../../models/profile';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
  error = '';
  success = '';
  profile: Profile;

  constructor(private userService: SettingsService) { }

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .then(user => {
          this.userService.getProfile(user._id)
        .then(profile => {
          if (profile) {
            this.profile = profile;
          } else {
            profile = new Profile();
            profile.userId = user._id;

            this.userService
              .createProfile(profile)
              .then(profile => {
                this.profile = profile;
              })
          }
        });
      })
      .catch(error => this.error = error);
  }

  save(): void {
    this.userService
      .updateProfile(this.profile)
      .then(user => this.success = 'Settings updated successfully')
      .catch(error => this.error = error);
  }
}