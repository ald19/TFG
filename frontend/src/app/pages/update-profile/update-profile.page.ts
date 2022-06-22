import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  user: any;
  newPassword: string;

  constructor(public userService: UserService, private authService: AuthService, private router: Router, private alertController: AlertController) {
    this.newPassword = null;
    this.user = {}
  }

  ngOnInit() {
    this.getUserInfo();
  }

  updateUser(form: NgForm){
    const data = {
      ...form.value,
      id_usuario: this.authService.getLoggedUser()
    };
    if(!data['password'] && !data['newPassword']){
      delete data['password'];
      delete data['newPassword'];
    }
    
    this.userService.updateProfile(data)
      .subscribe(
        () => this.router.navigate(['/tabs/main-profile']), 
        err => this.showAlert(err.error.msg)
      );
  }

  getUserInfo(){
    this.userService.getUserInfo(this.authService.getLoggedUser())
      .subscribe(resp => {
        this.user = {
          nombre: resp['nombre'],
          nickname: resp['nickname'],
          email: resp['email'],
          fecha_nacimiento: resp['fecha_nacimiento'].split('T')[0],
          password: null
        };
      });
  }

  async showAlert(msg: string){
    await this.alertController.create({
      header: "Error",
      message: msg,
      buttons: ['OK']
    }).then(res => {
      this.user.password = null;
      this.newPassword = null;
      res.present()
    });
  }

}
