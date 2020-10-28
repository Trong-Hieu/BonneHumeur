import { productModel } from './productModel';

export class shoppingCartItem {
  constructor(
    public product: productModel,
    public quantity: number
  ){}

  get totalPrice(){
    return this.product.price * this.quantity
  }

}
