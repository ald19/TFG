import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:3000/api";
  public user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User();
  }

  login(user: any){    
    return this.http.post<any>(this.URL + '/login', user);
  }

  register(user: any){
    return this.http.post(this.URL + '/registro', user);
  }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }
  }

  getLoggedUser(){
    if(this.loggedIn())
      return localStorage.getItem('id');
    else  
      return null;
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
}
