import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss']
})
export class EditProductPage implements OnInit {
  product: Product;

  constructor(
    private _route: ActivatedRoute,
    private _navCtrl: NavController,
    private _productsService: ProductsService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this._navCtrl.navigateBack('/tabs/stock');
        return;
      }
      this._productsService.getProduct(+paramMap.get('id')).subscribe(p => {
        this.product = p;
      });
    });
  }
}
