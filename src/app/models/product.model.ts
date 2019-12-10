export class Product {
  constructor(
    public id: number,
    public name: string,
    public brand: string,
    public reference: string,
    public supplier: string,
    public supplierWebsite: string,
    public quantity: number,
    public minQuantity: number
  ) {}
}

export class ProductWithoutId {
  constructor(
    public name: string,
    public brand: string,
    public reference: string,
    public supplier: string,
    public supplierWebsite: string,
    public quantity: number,
    public minQuantity: number
  ) {}
}
