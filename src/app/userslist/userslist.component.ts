import { Component, OnInit } from '@angular/core';
import { UserslistService } from './userslist.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss'],
  providers: [UserslistService]
})
export class UserslistComponent implements OnInit {
  users: User[] = [];
  usersLength: Number = 0;
  constructor(private userslistService: UserslistService) {  }

  ngOnInit() {
    this.userslistService
    .getUsers()
    .subscribe(
    u => {
      this.users = u;
      console.log ('Users :' + u);
      this.usersLength = this.users.length;
      // this.categoryLoaded=true;
      }
  );
  }

}
