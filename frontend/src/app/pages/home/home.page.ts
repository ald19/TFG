import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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
	comments: number[];

	constructor(public recipesService: RecipesService, public userService: UserService, private router: Router, private authService: AuthService) {
		this.recipes = recipesService.recipes$;
		this.segment = "fecha_publicacion";
		this.check = false;
		this.comments = [];
	}

	ionViewWillEnter(){
		this.ngOnInit();
	}

	ngOnInit() {
		this.getRecipes();
	}

	getRecipes(){
		this.recipesService.getRecipes(this.segment, this.authService.getLoggedUser())
		.subscribe(res => {
			const result = res as Recipe[];
			this.recipesService.getImages(result);
			this.recipesService.setRecipes$(result, 'home');
			const favs = result.filter(e => e.fav);
			this.userService.setFavs$(favs);
		})
	}

	setFav(id_receta: number){
		this.userService.setFav(this.authService.getLoggedUser(), id_receta)
			.subscribe(() => this.getRecipes());
	}

	removeFav(id_receta: number){
		this.userService.removeFav(this.authService.getLoggedUser(), id_receta.toString())
			.subscribe(() => this.getRecipes());
	}

	checkFav(id_receta: number){
		this.userService.checkFav(this.authService.getLoggedUser(), id_receta.toString())
			.subscribe(resp => {
				const result = resp as Recipe[];
				if(!result.length)
					this.setFav(id_receta);
				else	
					this.removeFav(id_receta);
			});
	}

	showComments(id_recipe: number){
		this.router.navigate([`/tabs/comments/${id_recipe.toString()}`]);
	}

}
