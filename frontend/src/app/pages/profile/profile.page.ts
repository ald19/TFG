import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Recipe } from './../../models/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  check: boolean;
	recipes: Observable<Recipe[]>;
  id_user: string;
  info: any;
  following: boolean;

  constructor(
    public recipesService: RecipesService, 
    public userService: UserService,
    private router: Router, 
    public authService: AuthService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {
    this.recipes = recipesService.recipes$;
		this.check = false;
    this.id_user = this.authService.getLoggedUser();
    this.info = {
      nickname: null,
      publicaciones: 0,
      seguidores: 0,
      seguidos: 0
    }
    this.following = false;
  }

  ionViewWillEnter(){
		this.ngOnInit();
	}

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id_user'))
      this.id_user = this.route.snapshot.paramMap.get('id_user');
    else
      this.id_user = this.authService.getLoggedUser();
    this.getUserInfo(this.id_user);
		this.getRecipes();
    this.isFollowing();
	}

  getUserInfo(id_user: string){
    this.userService.getUserInfo(id_user)
      .subscribe(resp => {
        this.info = resp;
      });
  }

  isFollowing(){
    this.userService.isFollowing(this.authService.getLoggedUser(), this.id_user)
      .subscribe((resp: any) => {
          this.following = resp.following;
      });
  }

  followUser(){
    this.userService.followUser(this.authService.getLoggedUser(), this.id_user)
      .subscribe(() => {
        this.getUserInfo(this.id_user);
        this.isFollowing();
      });
  }

  unfollowUser(){
    this.userService.unfollowUser(this.authService.getLoggedUser(), this.id_user)
    .subscribe(() => {
      this.getUserInfo(this.id_user);
      this.isFollowing();
    });
  }

	getRecipes(){
		this.userService.getRecipesByUser(this.id_user)
		.subscribe(res => {
			const result = res as Recipe[];
			this.recipesService.getImages(result);
			this.recipesService.setRecipes$(result, 'home');
			const favs = result.filter(e => e.fav);
			this.userService.setFavs$(favs);
		});
	}

  removeRecipe(id_recipe: string){
    this.recipesService.deleteRecipe(id_recipe, this.id_user)
      .subscribe(() => {
        this.getRecipes();
      })
  }

	showComments(id_recipe: number){
		this.router.navigate([`/tabs/comments/${id_recipe.toString()}`]);
	}

  async showAlert(id_recipe: number){
    await this.alertController.create({
      header: "Eliminar receta",
      message: "¿Estás seguro que deseas eliminar la receta?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.removeRecipe(id_recipe.toString());
          }
        }
      ]
    }).then(res => res.present());
  }

  logOut(){
    this.authService.logOut();
  }
}
