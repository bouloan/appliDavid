import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ToastService } from '@shared/services/toast.service';
import { ProductsService } from './products.service';
import { StockPage } from './stock.page';

describe('StockPage', () => {
  let component: StockPage;
  let fixture: ComponentFixture<StockPage>;
  let productsService: ProductsService;
  let toastService: ToastService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockPage],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productsService = TestBed.get(ProductsService);
    toastService = TestBed.get(ToastService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // to do
  // should create add product button
  // should redirect to add product page when add product button is clicked
  // should redicrect to edit product page when add button is clicked
  // should set the subsciption to productslist from productsservice and update the component productsLists property
});
