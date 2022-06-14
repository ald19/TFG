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
  foodRecipe: any[];
  newRecipeFood: {id_food: null, name: null, quantity: null, ud: null};

  readonly URL = 'http://localhost:3000/api/recetas';
  readonly URL_Food = 'http://localhost:3000/api/alimentos';

  constructor(private http: HttpClient) { 
    this.selectedRecipe = new Recipe();
    this.foodRecipe = [];
    this.newRecipeFood = {id_food: null, name: null, quantity: null, ud: null};
  }
  
  removeItemFromArray = (array: any[], pos: number) => {
    array.splice(pos, 1);
  }

  getRecipes(option: string){
    return this.http.get(this.URL + `/${option}`);
  }

  getRecipe(id: string){
    return this.http.get(this.URL + `/${id}`);
  }

  getFood(id: string){
    return this.http.get(this.URL + `/${id}/alimentos`);
  }

  getSteps(id: string){
    return this.http.get(this.URL + `/${id}/pasos`);
  }

  getRecipeImages(id: string, id_usuario: number){
    return this.http.get(this.URL + `/${id}/imagenes`, {params: new HttpParams().append('id_usuario', id_usuario)});
  }

  getRecipeImage(id: string, id_usuario: number, filename: string){
    return this.http.get(this.URL + `/${id}/imagen`, {params: new HttpParams().append('id_usuario', id_usuario).append('filename', filename)});
  }

  getAllFood(){
    return this.http.get<any[]>(this.URL_Food);
  }

  postRecipe(id: string, recipe: any){
    return this.http.post(this.URL + `/${id}`, recipe);
  }

  addFoodToRecipe(id: string){
    return this.http.post(this.URL + `/${id}/agregarAlimentos`, this.foodRecipe);
  }

  addStepToRecipe(id: string, steps: any[]){
    return this.http.post(this.URL + `/${id}/agregarPaso`, steps);
  }

  addImagesToRecipe(id: string, image: any){
    return this.http.post(this.URL + `/${id}/imagenes`, image);
  }

  deleteRecipe(id_recipe: string, id_user: string){
    return this.http.get(this.URL + `/${id_user}/eliminarReceta/${id_recipe}`);
  }
  
  deleteImage(id_recipe: string, id_user: string, filename: string){
    return this.http.post(this.URL + `/${id_user}/eliminarImagen/${id_recipe}`, {filename: filename})
  }

  getRecipesByFood(food: number[]){
    let params = new HttpParams();
    food.forEach((e, i) => {
      params = params.append(`id_${i}`, e);
    });
    
    return this.http.get(this.URL + '/obtenerReceta/alimentos', {params: params})
  }

  getRecipesByName(name: string){
    return this.http.get(this.URL + '/obtenerReceta/nombreReceta', {params: new HttpParams().append('nombre', name)});
  }
}
