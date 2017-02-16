import { Component, OnInit } from '@angular/core';

import { Notification } from '../../models/notification';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit { 
  error = '';
  success = '';
  notification: Notification;

  constructor(private userService: SettingsService) { }

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .then(user => {
          this.userService.getNotification(user._id)
        .then(notification => {
          if (notification) {
            this.notification = notification;
          } else {
            notification = new Notification();
            notification.userId = user._id;

            this.userService
              .createNotification(notification)
              .then(notification => {
                this.notification = notification;
              })
          }
        });
      })
      .catch(error => this.error = error);
  }

  save(): void {
    this.userService
      .updateNotification(this.notification)
      .then(user => this.success = 'Settings updated successfully')
      .catch(error => this.error = error);
   }
}