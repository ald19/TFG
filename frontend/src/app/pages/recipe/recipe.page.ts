import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  	constructor(public recipesService: RecipesService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private userService: UserService) { }

	ngOnInit() {
		this.getRecipe();
		this.getSteps();
		this.getFood();
	}

	getRecipe(){
		this.recipesService.getRecipe(this.route.snapshot.paramMap.get('id'), 1)
		.subscribe(res => {
			this.recipesService.selectedRecipe = res as Recipe;
			this.getImages();
		})
	}

	getSteps(){
		this.recipesService.getSteps(this.route.snapshot.paramMap.get('id'))
		.subscribe(res => {
			this.recipesService.steps = res as any[];
		})
	}

	getFood(){
		this.recipesService.getFood(this.route.snapshot.paramMap.get('id'))
		.subscribe(res => {
			this.recipesService.food = res as any[];
		})
	}

	getImages(){
		this.recipesService.getRecipeImages(this.route.snapshot.paramMap.get('id'), this.recipesService.selectedRecipe.id_usuario)
		.subscribe((data: any) => {
			let images = [];
			if(data.images && data.images.length)
				images = data.images.map((img: string) => this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + img))
			
			this.recipesService.selectedRecipe.imagenes = images;
			this.updateFavs();
		});
	}

	updateFavs(){
		this.recipesService.getRecipes('fecha_publicacion', '1')
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
			.subscribe(() => this.getRecipe());
	}

	removeFav(id_receta: number){
		this.userService.removeFav('1', id_receta.toString())
			.subscribe(() => this.getRecipe());
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
