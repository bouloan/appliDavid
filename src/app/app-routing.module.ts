import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock',
    pathMatch: 'full'
  },
  {
    path: 'stock',
    children: [
      {
        path: '',
        loadChildren: () => import('@pages/stock/stock.module').then(m => m.StockPageModule)
      },
      {
        path: 'ajout-produit',
        loadChildren: () =>
          import('@pages/stock/add-product/add-product.module').then(m => m.AddProductPageModule)
      },
      {
        path: 'edition-produit/:id',
        loadChildren: () =>
          import('@pages/stock/edit-product/edit-product.module').then(m => m.EditProductPageModule)
      }
    ]
  },
  {
    path: 'agenda',
    loadChildren: () => import('@pages/agenda/agenda.module').then(m => m.AgendaPageModule)
  },
  {
    path: 'parametres',
    loadChildren: () =>
      import('@pages/parameters/parameters.module').then(m => m.ParametersPageModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
