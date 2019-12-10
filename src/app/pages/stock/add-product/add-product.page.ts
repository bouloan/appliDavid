import { Component, OnInit } from '@angular/core';
import { ProductWithoutId } from 'src/app/models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss']
})
export class AddProductPage implements OnInit {
  product: ProductWithoutId = new ProductWithoutId(
    'moteur6',
    'bubendorff',
    'ref11fsssfd2',
    'fournisseur2',
    'https://www.bubendorff.com/',
    11,
    5
  );
  constructor(private productsService: ProductsService) {}

  ngOnInit() {}

  onSaveProduct() {
    this.productsService.addProduct(this.product);
  }
}
