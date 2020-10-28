import { shoppingCartItem } from './shopping-cart-item';

export class shoppingCart{
  items: shoppingCartItem[] = []
  constructor(
    public itemsMap: {[productId: string]: shoppingCartItem}
  ){
    for (let productId in itemsMap){
      let item = itemsMap[productId]
      this.items.push(new shoppingCartItem(item.product, item.quantity))
    }
  }

  // get totalPrice(){
  //   let sum = 0
  //   for (let product of this.items){
  //     sum += product.totalPrice
  //   }
  //   return sum
  // }

  get count(){
    let count = 0
    for (let product of this.items){
      count += product.quantity
    }
    return count
  }
}
