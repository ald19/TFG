import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from './../../models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  segment: string;
  allFood: any[];
  selectedFood: number[];
  name: string;
  recipes: Observable<Recipe[]>;

  constructor(
    public recipesService: RecipesService, public userService: UserService, private authService: AuthService) {
    this.segment = "name";
    this.selectedFood = [];
    this.name = "";
    this.recipes = recipesService.recipesSearch$;
  }

  ngOnInit() {
    this.getAllFood();
  }

  getAllFood(){
		this.recipesService.getAllFood()
		.subscribe(resp => {
        this.allFood = resp;
    	});
  }

  manageOptions(){
    if(this.name){
      this.recipesService.getRecipesByName(this.name, this.authService.getLoggedUser())
      .subscribe(resp => this.setRecipes(resp));
    } else{
      this.recipesService.getRecipesByFood(this.selectedFood, this.authService.getLoggedUser())
      .subscribe(resp => this.setRecipes(resp));
    }
  }

  addFood(form: NgForm){
    this.allFood.forEach(e => {
      if(e.nombre == form.value.alimento){
        this.selectedFood.push(e)
      }
    });
    this.manageOptions();
  }

  setRecipes(data: any){
    const result = data as Recipe[];
    this.recipesService.getImages(result);
    this.recipesService.setRecipes$(result, 'search');
    
    this.recipesService.getRecipes('fecha_publicacion', this.authService.getLoggedUser())
    .subscribe(res => {
      const result2 = res as Recipe[];
      this.recipesService.getImages(result2);
      this.recipesService.setRecipes$(result2, 'home');
      const favs = result2.filter(e => e.fav);
      this.userService.setFavs$(favs);
    })
  }

  isDisabled(){
    return this.name == '' && this.selectedFood.length == 0;
  }

  setFav(id_receta: number){
		this.userService.setFav(this.authService.getLoggedUser(), id_receta)
			.subscribe(() => this.manageOptions());
	}

	removeFav(id_receta: number){
		this.userService.removeFav(this.authService.getLoggedUser(), id_receta.toString())
			.subscribe(() => this.manageOptions());
	}

	checkFav(id_receta: number){
		this.userService.checkFav(this.authService.getLoggedUser(), id_receta.toString())
			.subscribe(resp => {
				const result = resp as Recipe[];
				if(!result.length)
					this.setFav(id_receta);
				else	
					this.removeFav(id_receta);
			})
	}

}
