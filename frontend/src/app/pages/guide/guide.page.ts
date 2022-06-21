import { UserService } from './../../services/user.service';
import { AddCommentPage } from './../add-comment/add-comment.page';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe } from './../../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {

  section: string;
  step: number;

  constructor(
    public recipesService: RecipesService, 
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer, 
    private modalController: ModalController,
    public userService: UserService,
    private router: Router
  ) {
    this.section = 'start';
    this.step = 0;
  }

  ngOnInit() {
    this.getRecipe();
		this.getSteps();
		this.getFood();
  }

  getRecipe(){
		this.recipesService.getRecipe(this.route.snapshot.paramMap.get('id_recipe'), 1)
		.subscribe(res => {
			this.recipesService.selectedRecipe = res as Recipe;
			this.getImages();
		})
	}

	getSteps(){
		this.recipesService.getSteps(this.route.snapshot.paramMap.get('id_recipe'))
		.subscribe(res => {
			this.recipesService.steps = res as any[];
		})
	}

	getFood(){
		this.recipesService.getFood(this.route.snapshot.paramMap.get('id_recipe'))
		.subscribe(res => {
			this.recipesService.food = res as any[];
		})
	}

	getImages(){
		this.recipesService.getRecipeImages(this.route.snapshot.paramMap.get('id_recipe'), this.recipesService.selectedRecipe.id_usuario)
		.subscribe((data: any) => {
			let images = [];
			if(data.images && data.images.length)
				images = data.images.map((img: string) => this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + img))
			
			this.recipesService.selectedRecipe.imagenes = images;
		});
	}

  manageSections(option: string){
    if(option == 'continue'){
      switch (this.section) {
        case 'start':
          this.section = 'food';
          break;
        case 'food': 
          this.section = 'steps';
          break;
        default:
          break;
      }
    } else{
      switch (this.section) {
        case 'start':
          window.history.back();
          break;
        case 'food': 
          this.section = 'start';
          break;
        case 'steps':
          this.section = 'food';
          break;
        case 'end':
          this.section = 'steps';
          break;
        default:
          break;
      }
    }
  }

  manageSteps(option: string){
    if(option == 'continue'){
      if(this.step == this.recipesService.steps.length-1)
        this.getComment();
      else
        this.step++;
    }
    else{
      if(this.step == 0)
        this.section = 'food';
      else
        this.step--;
    }
  }

  getComment(){
    this.userService.getComment(this.route.snapshot.paramMap.get('id_recipe'), '1')
      .subscribe(resp => {
        const result = resp as any[];
        if(result.length)
          this.userService.commented = true;
        else 
          this.userService.commented = false;
        this.section = 'end';
      });
  }

  endGuide(option: string){
    if(option == 'recipe'){
      this.section = 'start';
      this.step = 0;
      this.router.navigate(['/tabs/recipe', this.route.snapshot.paramMap.get('id_recipe')]);
    } else {
      this.router.navigate(['/tabs/comments', this.route.snapshot.paramMap.get('id_recipe')]);
    }
  }

  async openModal(){
		const modal = await this.modalController.create({
			component: AddCommentPage,
      componentProps: {
        id_recipe: this.route.snapshot.paramMap.get('id_recipe')
      },
			cssClass: 'modal-comment',
		});
		return await modal.present();
	}

}
