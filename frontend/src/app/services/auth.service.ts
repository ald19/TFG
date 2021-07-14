import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:3000/api";
  public user: User;

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  login(user: any){    
    return this.http.post<any>(this.URL + "/login", user);
  }

  register(user: any){

  }
}
