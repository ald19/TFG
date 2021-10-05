import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthService, 
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.router.navigate(['/']);
    }
  }

  login(form: NgForm){
    this.authService.login(form.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        err => {
          this.showAlert(err.error)
          form.reset();
        });
  }

  async showAlert(msg: string){
    await this.alertController.create({
      header: "Error al iniciar sesión",
      message: msg,
      buttons: ['OK']
    }).then(res => res.present());
  }

}
