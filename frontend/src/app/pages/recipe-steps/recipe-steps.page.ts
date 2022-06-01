import { Router } from '@angular/router';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { RecipesService } from './../../services/recipes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './recipe-steps.page.html',
  styleUrls: ['./recipe-steps.page.scss'],
})
export class RecipeStepsPage implements OnInit {

  steps: any[];

  constructor(public recipesService: RecipesService, private router: Router, private sanitizer: DomSanitizer) {
    this.steps = [];
  }

  ngOnInit() {
		if(this.recipesService.selectedRecipe.id == -1)
			this.router.navigate(['/tabs/new-recipe']);
  }

  removeImage(pos: number){
      this.recipesService.deleteImage(this.recipesService.selectedRecipe.id.toString(), this.recipesService.selectedRecipe.id_usuario.toString(), this.steps[pos].filename)
        .subscribe(() => {
          this.steps[pos] = {...this.steps[pos], filename: '', image: ''};
        });
  }

  removeStep(pos: number){
    this.removeImage(pos);
    this.steps.splice(pos, 1);
  }

  changeText($event: any, pos: number){
    this.steps[pos].description = $event.target.value;
  }

  addStep(){
    this.steps.push({description: '', img: '', filename: ''});
  }

  loadImage(event: any, pos: number){
    let file: File = event.target.files[0];
    this.steps[pos].filename = file.name;
    let aux = new FormData();
    aux.append("image", file);
    aux.append("id_usuario", this.recipesService.selectedRecipe.id_usuario.toString());

    this.recipesService.addImagesToRecipe(this.recipesService.selectedRecipe.id.toString(), aux)
      .subscribe(() => {
        this.getImage(file.name, pos);
      });
  }

  addSteps(){
    const aux = this.steps.map(item => {
      return {description: item.description}
    });
    this.recipesService.addStepToRecipe(this.recipesService.selectedRecipe.id.toString(), aux)
    .subscribe(resp => {
      this.router.navigate([`/tabs/recipe/${this.recipesService.selectedRecipe.id.toString()}`]);
      this.recipesService.selectedRecipe = new Recipe();
    });
  }

  getImage(filename: string, pos: number){
		this.recipesService.getRecipeImage(this.recipesService.selectedRecipe.id.toString(), this.recipesService.selectedRecipe.id_usuario, filename)
		.subscribe((resp: any) => {
      let image = null;
			if(resp.image)
				image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + resp.image);
      
      this.steps[pos].image = image;
		});
	}

}
