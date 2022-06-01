import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeStepsPageRoutingModule } from './recipe-steps-routing.module';

import { RecipeStepsPage } from './recipe-steps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeStepsPageRoutingModule
  ],
  declarations: [RecipeStepsPage]
})
export class RecipeStepsPageModule {}
