import { AuthService } from 'src/app/services/auth.service';
import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';

@Component({
	selector: 'app-new-recipe',
	templateUrl: './new-recipe.page.html',
	styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
	constructor(public recipesService: RecipesService, private router: Router, private authService: AuthService) {}

	ngOnInit() {
		this.recipesService.selectedRecipe = new Recipe();
	}

	createRecipe(form: NgForm){
		this.recipesService.postRecipe(this.authService.getLoggedUser(), form.value)
			.subscribe(
				resp => {
				this.recipesService.selectedRecipe.id_usuario = Number(this.authService.getLoggedUser());
				this.recipesService.selectedRecipe.id = resp['id_recipe'];
				this.recipesService.selectedRecipe.fecha_publicacion = new Date().toISOString().slice(0,10);
				form.reset();
				this.router.navigate(['/tabs/add-food']);
			},
			err => {
				console.log(err.error);
				form.reset();
			})
	}
}
