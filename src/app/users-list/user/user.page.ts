import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  
  modif !:boolean;
  user :any = null;

  constructor(
    private alertCtrl :AlertController,
    private route: ActivatedRoute,
    private User: UserService,
    private toastCtrl: ToastController,
    private router: Router 
    ) { }

  ngOnInit() {
    this.modif = false;
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.User.get(id).subscribe((value: any) => {
      this.user = value;
    });
  }


  async setModif() {
    if(!this.modif) {
      const alert = await this.alertCtrl.create({
        header: 'Are you sure to modify ?',
        subHeader: 'You will enable the modification',
        buttons: [
          {
           text: 'Cancel',
           role: 'Cancel'
          },
          {
            text: 'Confirm',
            handler: () => {
              this.modif = !this.modif
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Vos modifications sont enregistrées',
      duration: 2000
    });
    (await toast).present();
  }

  onModif() {
    this.User.update(this.user).subscribe(() => {
      this.presentToast();
      this.modif = false;
    });
  }

  onDelete(id: any) {
    this.User.delete(id);
    this.router.navigate(['/tabs/users'])
  }
}
