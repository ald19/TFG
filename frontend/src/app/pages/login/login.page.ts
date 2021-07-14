import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

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
          console.log(err)
        });
  }

}
