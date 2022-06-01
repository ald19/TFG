import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeStepsPage } from './recipe-steps.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeStepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeStepsPageRoutingModule {}
