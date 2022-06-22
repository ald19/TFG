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
    
    if(form.value.password != form.value.passConf){
      this.showAlert("Las contraseñas no coinciden")
      form.reset();
    } else{
      this.authService.register(form.value)
      .subscribe(
        () => {
          form.reset();
          this.router.navigate(['/login']);
        },
        err => {
          this.showAlert(err.error.msg)
          form.reset();
        });
    }
    
  }

  async showAlert(msg: string){
    await this.alertController.create({
      header: "Error en el registro",
      message: msg,
      buttons: ['OK']
    }).then(res => res.present());
  }
}
