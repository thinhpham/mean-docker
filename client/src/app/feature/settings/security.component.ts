import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { User } from '../../models/user';
import { UserService } from './user.service';

@Component({
  selector: 'toh-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  /*
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.get(params['_id']))
      .subscribe((user) => {
        this.user = user;
      });
  }

  get(id: string): Promise<User> {
    const url = `${this.serviceUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  save(): void {
    this.userService
      .update(this.user)
      .then(() => console.log('Updated'));
  }
  */
}