import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StockPage } from './stock.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    RouterModule.forChild([{ path: '', component: StockPage }])
  ],
  declarations: [StockPage]
})
export class StockPageModule {}
