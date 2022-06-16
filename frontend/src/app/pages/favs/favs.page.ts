import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from './../../models/recipe';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {

  recipes: Observable<Recipe[]>;

  constructor(public userService: UserService, public recipesService: RecipesService, private sanitizer: DomSanitizer) {
    this.recipes = userService.favRecipes$;
  }

  ngOnInit() {
    this.getRecipes();
  }

  getFavs(){
	this.userService.getFavs$()
	.subscribe(resp => {
		this.userService.favRecipes = resp;
	})
  }

  	getRecipes(){
		this.recipesService.getRecipes('fecha_publicacion', '1')
		.subscribe(res => {
			const result = res as Recipe[];
			this.recipesService.getImages(result);
			this.recipesService.setRecipes$(result, 'home');
			const favs = result.filter(e => e.fav);
			this.userService.setFavs$(favs);
		})
	}

  removeFav(id_receta: string){
    this.userService.removeFav('1', id_receta)
      .subscribe(() => this.getRecipes());
  }

}
