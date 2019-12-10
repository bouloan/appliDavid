import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { ProductsService } from '@pages/stock/products.service';
import { ToastService } from '@shared/services/toast.service';
import { Product, ProductWithoutId } from 'src/app/models/product.model';

const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  @Input() product: ProductWithoutId | Product;
  number: number = 0;

  constructor(
    private _loadingCtrl: LoadingController,
    private _productsService: ProductsService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    if (!this.product) {
      this.product = new ProductWithoutId('', '', '', '', '', 0, 0);
    }
    this.form = new FormGroup({
      name: new FormControl(this.product.name, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      brand: new FormControl(this.product.brand, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      reference: new FormControl(this.product.reference, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      supplier: new FormControl(this.product.supplier, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      supplierWebsite: new FormControl(this.product.supplierWebsite, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      quantity: new FormControl(this.product.quantity, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(0)]
      }),
      minQuantity: new FormControl(this.product.minQuantity, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(0)]
      })
    });
  }

  increment(inputName: string) {
    let value = this.form.controls[inputName].value;
    value++;
    this.form.controls[inputName].setValue(value);
  }
  decrement(inputName: string) {
    let value = this.form.controls[inputName].value;
    if (value > 0) value--;
    this.form.controls[inputName].setValue(value);
  }

  async onRegisterProduct() {
    if (!this.form.valid) return;
    const loading = await this._loadingCtrl.create({
      message: 'Enregistrement du produit'
    });
    await loading.present();
    let register;
    if (this.product instanceof ProductWithoutId) {
      register = this._productsService.addProduct(this.form.value);
    } else {
      register = this._productsService.updateProduct(this.product.id, this.form.value);
    }
    register.subscribe(() => {
      loading.dismiss();
      this.form.reset();
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Title',
            body: 'Body',
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 5) },
            sound: null,
            attachments: null,
            actionTypeId: '',
            extra: null
          }
        ]
      });
      this._toastService.presentToast('Le produit a bien été enregistré');
      this._router.navigate(['/']);
    });
  }
}
