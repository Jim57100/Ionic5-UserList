import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  users !:any;
  

  constructor(private User: UserService) { }

  ngOnInit() :void 
  {
    this.User.getAllUsers().subscribe((data :any) => {
      this.users = data;
    });
  }

}
