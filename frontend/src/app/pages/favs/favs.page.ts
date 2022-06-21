import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from './../../models/recipe';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {

  recipes: Observable<Recipe[]>;

  constructor(public userService: UserService, public recipesService: RecipesService, private authService: AuthService) {
    this.recipes = userService.favRecipes$;
  }

  ionViewWillEnter(){
		this.ngOnInit();
	}

  ngOnInit() {
    this.getRecipes();
  }

  getFavs(){
	this.userService.getFavs$()
    .subscribe(resp => {
      this.userService.favRecipes = resp;
    })
  }

  getRecipes(){
  this.recipesService.getRecipes('fecha_publicacion', this.authService.getLoggedUser())
  .subscribe(res => {
    const result = res as Recipe[];
    this.recipesService.getImages(result);
    this.recipesService.setRecipes$(result, 'home');
    const favs = result.filter(e => e.fav);
    this.userService.setFavs$(favs);
  })
	}

  removeFav(id_receta: string){
    this.userService.removeFav(this.authService.getLoggedUser(), id_receta)
      .subscribe(() => this.getRecipes());
  }

}
