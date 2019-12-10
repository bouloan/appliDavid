import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@models/product.model';
import { ToastService } from '@shared/services/toast.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-stock',
  templateUrl: 'stock.page.html',
  styleUrls: ['stock.page.scss']
})
export class StockPage {
	public productslist: Product[];
	private _unsubscribe$ = new Subject<void>();

  constructor(
    private _productsService: ProductsService,
    private _toastService: ToastService,
    private _router: Router
  ) {}

  ionViewWillEnter() {
    this._productsService.productsList.pipe(takeUntil(this._unsubscribe$)).subscribe(products => (this.productslist = products));
  }

  onProductDetails(id: number) {
    this._productsService.getProduct(id).subscribe(product => {
      this._router.navigateByUrl(`/stock/edition-produit/${id}`);
    });
  }

  onRemoveProduct(id: number) {
    this._productsService.removeProduct(id);
    this._toastService.presentToast('Le produit a été supprimé de la liste.');
	}
	
	ionViewDidLeave(){
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}
}
