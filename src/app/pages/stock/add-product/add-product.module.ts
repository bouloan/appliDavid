import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProductPage } from './add-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [AddProductPage]
})
export class AddProductPageModule {}
