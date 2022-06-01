import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ModalController } from '@ionic/angular';
import { AddFoodModalPage } from '../add-food-modal/add-food-modal.page';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage implements OnInit {
  
  	allFood: any[];

	constructor(public recipesService: RecipesService, public modalController: ModalController, private router: Router) {}

	ngOnInit() {
		if(this.recipesService.selectedRecipe.id != -1){
			this.recipesService.getAllFood()
			.subscribe(resp => {
				this.allFood = resp;
			})
		} else{
			this.router.navigate(['/tabs/new-recipe']);
		}
	}

	addFoodToRecipe(){
		this.recipesService.addFoodToRecipe(this.recipesService.selectedRecipe.id.toString())
			.subscribe(() => {
				this.router.navigate(['/tabs/recipe-steps']);
			});
	}

	async openModal(){
		const modal = await this.modalController.create({
			component: AddFoodModalPage,
			cssClass: 'modal-class',
		});
		return await modal.present();
	}

}
