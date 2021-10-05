import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public recipesService: RecipesService) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(){
    this.recipesService.getRecipes()
      .subscribe(res => {
        this.recipesService.recipes = res as Recipe[];
        this.getUserRecipe(this.recipesService.recipes)
        console.log(this.recipesService.recipes)
      })
  }

  getUserRecipe(recipes: Recipe[]){
    recipes.map((recipe, i) => {
      this.recipesService.getUserRecipe(recipe.id_usuario.toString())
        .subscribe(res => {
          let aux = {
            ...recipe,
            nickname: res['nickname']
          }
          this.recipesService.recipes[i] = aux;
        })
    })
  }

}
