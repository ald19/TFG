import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm){
    this.authService.login(form.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
        },
        err => {
          console.log(err)
        });
  }

}
