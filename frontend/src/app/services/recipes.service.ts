import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  food: any[];
  steps: any[];
  selectedRecipe: Recipe;
  recipes: Recipe[];
  readonly URL = 'http://localhost:3000/api/recetas';

  constructor(private http: HttpClient) { 
    this.selectedRecipe = new Recipe();
  }

  getRecipes(){
    return this.http.get(this.URL);
  }

  getRecipe(id: string){
    return this.http.get(this.URL + `/${id}`)
  }

  getFood(id: string){
    return this.http.get(this.URL + `/${id}/alimentos`)
  }

  getSteps(id: string){
    return this.http.get(this.URL + `/${id}/pasos`)
  }

  getRecipeImages(id: string, id_usuario: number){
    return this.http.get(this.URL + `/${id}/imagenes`, {params: new HttpParams().append('id_usuario', id_usuario)})
  }
}
