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
  comments: any[];
  commented: boolean;

  readonly URL = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) {
    this.favRecipes = [];
    this.favRecipes$ = new BehaviorSubject<Recipe[]>([]);
    this.comments = [];
    this.commented = false;
  }

  getRecipesByUser(id: string){
    return this.http.get(this.URL + `/perfil/${id}/recetas/all`);
  }

  getUserInfo(id: string){
    return this.http.get(this.URL + `/perfil/${id}/info`);
  }

  followUser(id_user: string, id_user2: string){
    return this.http.post(this.URL + `/perfil/${id_user}/${id_user2}`, {id_usuario1: id_user, id_usuario2: id_user2});
  }

  unfollowUser(id_user: string, id_user2: string){
    return this.http.get(this.URL + `/perfil/${id_user}/${id_user2}`);
  }

  isFollowing(id_user: string, id_user2: string){
    return this.http.get(this.URL + `/perfil/${id_user}/siguiendo/${id_user2}`);
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

  setFav(id_user: string, id_recipe: number){
    return this.http.post(this.URL + `/${id_user}`, {id_receta: id_recipe});
  }

  removeFav(id_user: string, id_recipe: string){
    return this.http.get(this.URL + `/${id_user}/${id_recipe}`);
  }

  checkFav(id_user: string, id_recipe: string){
    return this.http.get(this.URL + `/${id_user}/check/${id_recipe}`);
  }

  getComments(id_recipe: string){
    return this.http.get(this.URL + `/${id_recipe}/comentarios/all`);
  }

  getComment(id_recipe: string, id_user: string){
    return this.http.get(this.URL + `/${id_recipe}/comentario/${id_user}`);
  }

  addComment(id_recipe: string, id_user: string, comment: any){
    return this.http.post(this.URL + `/${id_recipe}/comentario/${id_user}`, comment);
  }

  removeComment(id_recipe: string, id_user: string){
    return this.http.get(this.URL + `/${id_recipe}/eliminarComentario/${id_user}`);
  }
}
