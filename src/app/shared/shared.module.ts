import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { PeriodFilterPipe } from './pipes/period-filter.pipe';

@NgModule({
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  declarations: [HeaderComponent, ProductFormComponent, PeriodFilterPipe],
  exports: [HeaderComponent, ProductFormComponent, PeriodFilterPipe]
})
export class SharedModule {}
