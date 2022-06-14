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
  recipes: Recipe[];

  constructor(public recipesService: RecipesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.segment = "name";
    this.selectedFood = [];
    this.name = "";
    this.recipes = [];
  }

  ngOnInit() {
    this.getAllFood();
  }

  getAllFood(){
		this.recipesService.getAllFood()
		.subscribe(resp => {
        this.allFood = resp;
    	})
  }

  addFood(form: NgForm){
    this.allFood.forEach(e => {
      if(e.nombre == form.value.alimento){
        this.selectedFood.push(e)
      }
    });
    if(this.name){
      this.recipesService.getRecipesByName(this.name)
      .subscribe(resp => {
        this.setRecipes(resp);
      })
    } else{
      this.recipesService.getRecipesByFood(this.selectedFood)
      .subscribe(resp => {
        this.setRecipes(resp);
      })
    }
  }

  setRecipes(data: any){
    this.recipes = data as Recipe[];
    this.getImages();
  }

	getImages(){
		this.recipes.forEach((e, i) => {
			this.recipesService.getRecipeImages(e.id.toString(), e.id_usuario)
			.subscribe((data: any) => {
				if(data.images && data.images.length)
					this.recipes[i].imagenes = data.images.map((img: string) => this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + img))
			});
		})
		
	}

  isDisabled(){
    return this.name == '' && this.selectedFood.length == 0;
  }

}
