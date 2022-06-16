import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	segment: string;
	check: boolean;
	recipes: Observable<Recipe[]>;

	constructor(public recipesService: RecipesService, public userService: UserService) {
		this.recipes = recipesService.recipes$;
		this.segment = "fecha_publicacion";
		this.check = false;
	}

	ngOnInit() {
		this.getRecipes();
	}

	getRecipes(){
		this.recipesService.getRecipes(this.segment, '1')
		.subscribe(res => {
			const result = res as Recipe[];
			this.recipesService.getImages(result);
			this.recipesService.setRecipes$(result, 'home');
			const favs = result.filter(e => e.fav);
			this.userService.setFavs$(favs);
		})
	}

	setFav(id_receta: number){
		this.userService.setFav('1', id_receta)
			.subscribe(() => this.getRecipes());
	}

	removeFav(id_receta: number){
		this.userService.removeFav('1', id_receta.toString())
			.subscribe(() => this.getRecipes());
	}

	checkFav(id_receta: number){
		this.userService.checkFav('1', id_receta.toString())
			.subscribe(resp => {
				const result = resp as Recipe[];
				if(!result.length)
					this.setFav(id_receta);
				else	
					this.removeFav(id_receta);
			});
	}

}
