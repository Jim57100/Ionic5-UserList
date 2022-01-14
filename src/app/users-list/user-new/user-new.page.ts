import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/user.service';



@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.page.html',
  styleUrls: ['./user-new.page.scss'],
})
export class UserNewPage implements OnInit {

  public user!: User;

  constructor(
    private User: UserService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() 
  {
    this.user = new User();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'New member recorded !',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/tabs/users']);
      }, 2000);
    });
  }

  add() {
    this.User.saveNewUser(this.user).subscribe(() => {
      this.user = new User();
      this.presentToast();
    })
  }

}
