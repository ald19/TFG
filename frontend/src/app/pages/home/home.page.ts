import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	segment: string;

	constructor(public recipesService: RecipesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
		this.segment = "fecha_publicacion";
	}

	ngOnInit() {
		this.getRecipes();
	}

	getRecipes(){
		this.recipesService.getRecipes(this.segment)
		.subscribe(res => {
			this.recipesService.recipes = res as Recipe[];
			this.getImages();
		})
	}

	getImages(){
		this.recipesService.recipes.forEach((e, i) => {
			this.recipesService.getRecipeImages(e.id.toString(), e.id_usuario)
			.subscribe((data: any) => {
				if(data.images && data.images.length)
					this.recipesService.recipes[i].imagenes = data.images.map((img: string) => this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + img))
			});
		})
		
	}

}
