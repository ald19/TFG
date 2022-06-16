import { Subject, BehaviorSubject } from 'rxjs';
import { Recipe } from './../models/recipe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  favRecipes: Recipe[];
  favRecipes$: BehaviorSubject<Recipe[]>;

  readonly URL = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) {
    this.favRecipes = [];
    this.favRecipes$ = new BehaviorSubject<Recipe[]>([]);
  }

  getFavs(id: string){
    return this.http.get(this.URL + `/${id}`);
  }

  getFavs$(){
    return this.favRecipes$.asObservable();
  }

  setFavs$(recipes: Recipe[]){
    this.favRecipes$.next(recipes);
  }

  setFav(id_usuario: string, id_receta: number){
    return this.http.post(this.URL + `/${id_usuario}`, {id_receta: id_receta});
  }

  removeFav(id_usuario: string, id_receta: string){
    return this.http.get(this.URL + `/${id_usuario}/${id_receta}`);
  }

  checkFav(id_usuario: string, id_receta: string){
    return this.http.get(this.URL + `/${id_usuario}/check/${id_receta}`);
  }
}
