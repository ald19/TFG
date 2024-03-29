import { AuthGuard } from './../../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'recipe/:id',
        loadChildren: () => import('../../pages/recipe/recipe.module').then( m => m.RecipePageModule)
      },
      {
        path: 'new-recipe',
        loadChildren: () => import('../../pages/new-recipe/new-recipe.module').then( m => m.NewRecipePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-food',
        loadChildren: () => import('../../pages/add-food/add-food.module').then( m => m.AddFoodPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-food-modal',
        loadChildren: () => import('../../pages/add-food-modal/add-food-modal.module').then( m => m.AddFoodModalPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'recipe-steps',
        loadChildren: () => import('../../pages/recipe-steps/recipe-steps.module').then( m => m.RecipeStepsPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../pages/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'favs',
        loadChildren: () => import('../../pages/favs/favs.module').then( m => m.FavsPageModule)
      },
      {
        path: 'comments/:id_recipe',
        loadChildren: () => import('../../pages/comments/comments.module').then( m => m.CommentsPageModule)
      },
      {
        path: 'add-comment',
        loadChildren: () => import('../../pages/add-comment/add-comment.module').then( m => m.AddCommentPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'guide/:id_recipe',
        loadChildren: () => import('../../pages/guide/guide.module').then( m => m.GuidePageModule)
      },
      {
        path: 'main-profile',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'update-profile',
        loadChildren: () => import('../../pages/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/:id_user',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
