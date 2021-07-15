import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public passConf = "";

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

  register(form: NgForm){
    console.log(form.value)

    if(form.value.password != form.value.passConf){
      this.showAlert("Las contraseñas no coinciden")
      form.reset();
    } else{
      this.authService.register(form.value)
      .subscribe(
        res => {
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err.error)
          this.showAlert(err.error)
          form.reset();
        });
    }
    
  }

  async showAlert(msg: string){
    await this.alertController.create({
      header: "Error al iniciar sesión",
      message: msg,
      buttons: ['OK']
    }).then(res => res.present());
  }
}
