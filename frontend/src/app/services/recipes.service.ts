import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  food: any[];
  steps: any[];
  selectedRecipe: Recipe;
  recipesSearch$: BehaviorSubject<Recipe[]>;
  recipes$: BehaviorSubject<Recipe[]>;
  foodRecipe: any[];
  newRecipeFood: {id_food: null, name: null, quantity: null, ud: null};

  readonly URL = 'http://localhost:3000/api/recetas';
  readonly URL_Food = 'http://localhost:3000/api/alimentos';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { 
    this.recipesSearch$ = new BehaviorSubject<Recipe[]>([]);
    this.recipes$ = new BehaviorSubject<Recipe[]>([]);
    this.selectedRecipe = new Recipe();
    this.foodRecipe = [];
    this.newRecipeFood = {id_food: null, name: null, quantity: null, ud: null};
  }
  
  removeItemFromArray = (array: any[], pos: number) => {
    array.splice(pos, 1);
  }

  getRecipes(option: string, id_user: string){
    return this.http.get(this.URL + `/recetas/${option}/${id_user}`);
  }

  getRecipes$(option: string): Observable<Recipe[]>{
    if(option == 'home')
      return this.recipes$.asObservable();
    else 
      return this.recipesSearch$.asObservable();
  }

  setRecipes$(recipes: Recipe[], option: string){
    if(option == 'home')
      this.recipes$.next(recipes);
    else  
      this.recipesSearch$.next(recipes);
  }

  getRecipe(id: string, id_user: string){
    return this.http.get(this.URL + `/receta/${id}/${id_user}`);
  }

  getFood(id: string){
    return this.http.get(this.URL + `/${id}/alimentos`);
  }

  getSteps(id: string){
    return this.http.get(this.URL + `/${id}/pasos`);
  }

  getRecipeImages(id: string, id_user: number){
    return this.http.get(this.URL + `/${id}/imagenes`, {params: new HttpParams().append('id_usuario', id_user)});
  }

  getRecipeImage(id: string, id_user: number, filename: string){
    return this.http.get(this.URL + `/${id}/imagen`, {params: new HttpParams().append('id_usuario', id_user).append('filename', filename)});
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

  getRecipesByFood(food: number[], id_user: string){
    let params = new HttpParams();
    food.forEach((e, i) => {
      params = params.append(`id_${i}`, e);
    });
    
    return this.http.get(this.URL + `/${id_user}/obtenerReceta/alimentos`, {params: params})
  }

  getRecipesByName(name: string, id_user: string){
    return this.http.get(this.URL + `/${id_user}/obtenerReceta/nombreReceta`, {params: new HttpParams().append('nombre', name)});
  }

  getImages(recipes: Recipe[]){
    recipes.forEach((e, i) => {
			this.getRecipeImages(e.id.toString(), e.id_usuario)
        .subscribe((data: any) => {
          if(data.images && data.images.length)
            recipes[i].imagenes = data.images.map((img: string) => this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + img));
        });
		});
  }

}
