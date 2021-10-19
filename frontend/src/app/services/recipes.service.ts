import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  selectedRecipe: Recipe;
  recipes: Recipe[];
  readonly URL = 'http://localhost:3000/api/recetas';

  constructor(private http: HttpClient) { 
    this.selectedRecipe = new Recipe();
  }

  getRecipes(){
    return this.http.get(this.URL);
  }

  getUserRecipe(id: string){
    return this.http.get(this.URL + `/user/${id}`)
  }
}
