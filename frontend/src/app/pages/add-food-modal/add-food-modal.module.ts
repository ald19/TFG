import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFoodModalPageRoutingModule } from './add-food-modal-routing.module';

import { AddFoodModalPage } from './add-food-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFoodModalPageRoutingModule
  ],
  declarations: [AddFoodModalPage]
})
export class AddFoodModalPageModule {}
