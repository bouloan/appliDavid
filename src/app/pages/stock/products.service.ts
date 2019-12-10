import { Injectable } from '@angular/core';
import { Product, ProductWithoutId } from '@models/product.model';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _productsList: BehaviorSubject<Product[]> = new BehaviorSubject([
    new Product(1, 'moteur1', 'somfy', 'ref112', 'fournisseur1', 'https://www.somfy.fr', 12, 5),
    new Product(
      2,
      'moteur2',
      'bubendorff',
      'ref11ddddd2',
      'fournisseur2',
      'https://www.bubendorff.com/',
      312,
      3
    ),
    new Product(
      3,
      'moteur3',
      'simu',
      'ref11fffd2',
      'fournisseur3',
      'https://www.simu.com/fr/',
      32,
      5
    ),
    new Product(
      4,
      'moteur4',
      'simu',
      'ref11ffggfffd2',
      'fournisseur3',
      'https://www.simu.com/fr/',
      22,
      5
    ),
    new Product(
      5,
      'moteur5',
      'simu',
      'ref11fsssfd2',
      'fournisseur3',
      'https://www.simu.com/fr/',
      11,
      5
    ),
    new Product(
      6,
      'moteur6',
      'bubendorff',
      'ref11fsssfd2',
      'fournisseur2',
      'https://www.bubendorff.com/',
      11,
      5
    ),
    new Product(
      7,
      'moteur7',
      'bubendorff',
      'refd2',
      'fournisseur2',
      'https://www.bubendorff.com/',
      16,
      4
    )
  ]);

  get productsList() {
    return this._productsList.asObservable();
  }

  getProduct(id: number) {
    return this.productsList.pipe(
      take(1),
      map(products => {
        return { ...products.find(p => p.id === id) };
      })
    );
  }

  updateProduct(id: number, modifiedProductWithoutId: ProductWithoutId) {
    return this.productsList.pipe(
      take(1),
      map(products => {
        const {
          name,
          brand,
          reference,
          supplier,
          supplierWebsite,
          quantity,
          minQuantity
        } = modifiedProductWithoutId;
        const updatedProductIndex = products.findIndex(p => p.id === id);
        const updatedProducts = [...products];
        updatedProducts[updatedProductIndex] = new Product(
          id,
          name,
          brand,
          reference,
          supplier,
          supplierWebsite,
          quantity,
          minQuantity
        );
        this._productsList.next(updatedProducts);
      })
    );
  }

  addProduct(productWithoutId: ProductWithoutId) {
    return this.productsList.pipe(
      take(1),
      tap(products => {
        //retrieve the id of latest product of the list which has the highest one
        const { id } = products[products.length - 1];
        const {
          name,
          brand,
          reference,
          supplier,
          supplierWebsite,
          quantity,
          minQuantity
        } = productWithoutId;
        const newProduct = new Product(
          id + 1,
          name,
          brand,
          reference,
          supplier,
          supplierWebsite,
          quantity,
          minQuantity
        );
        this._productsList.next(products.concat(newProduct));
      })
    );
  }

  removeProduct(id: number) {
    const productsList = this._productsList.getValue();
    const newProductsList = productsList.filter(p => p.id !== id);
    this._productsList.next(newProductsList);
  }
}
