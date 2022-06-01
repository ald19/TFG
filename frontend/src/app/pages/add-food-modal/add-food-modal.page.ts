import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-add-food-modal',
  templateUrl: './add-food-modal.page.html',
  styleUrls: ['./add-food-modal.page.scss'],
})
export class AddFoodModalPage implements OnInit {

 	allFood: any[];

  	constructor(public modalController: ModalController, public recipesService: RecipesService) { }

  	ngOnInit(){
		console.log(this.recipesService.foodRecipe)
    	this.getAllFood();
  	}

  	addFood(form: NgForm){
		this.allFood.forEach(e => {
			if(e.nombre == form.value.alimento){
				const aux = {
					id_food: e.id,
					name: e.nombre,
					quantity: form.value.cantidad,
					ud: e.unidades
				}
				this.recipesService.foodRecipe.push(aux);
			}
		});
		form.reset();
		this.closeModal();
  	}

	getAllFood(){
		this.recipesService.getAllFood()
		.subscribe(resp => {
      		this.allFood = resp;
    	})
  	}

  	closeModal(){
    	this.modalController.dismiss();
  	}

}
