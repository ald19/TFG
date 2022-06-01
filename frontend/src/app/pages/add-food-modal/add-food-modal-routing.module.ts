import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFoodModalPage } from './add-food-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddFoodModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFoodModalPageRoutingModule {}
