import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { productModel } from '../Model/productModel';
import { shoppingCart } from '../Model/shopping-cart';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartId: string

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(currentUser => {
      if (currentUser){
        this.cartId = currentUser.uid
      }
      else this.cartId = firestore.createId()

    })


   }

   async addToCart(product: productModel){
     let item$ = this.firestore.collection("shopping-carts").doc(this.cartId)
      .collection("items").doc(product.id)

      item$.valueChanges().pipe(take(1)).subscribe((item: any) =>{
        if (item) item$.update({quantity: item.quantity + 1})
        else item$.set({product: product, quantity: 1})
      })
   }

   async removeFromCart(product: productModel){
     let item$ = this.firestore.collection("shopping-carts").doc(this.cartId)
      .collection("items").doc(product.id)

      item$.valueChanges().pipe(take(1)).subscribe((item: any) =>{
        if (item){
          item$.update({quantity: item.quantity - 1})
          if (item.quantity === 1) item$.delete()
        }
      })
   }



  //  async getCart(): Promise<Observable<shoppingCart>>{

  //   // await this.getCartId()

  //   return this.firestore.collection("shopping-carts").doc(this.cartId)
  //     .valueChanges().pipe(map(x => new shoppingCart(x['items'])))
  //  }

  //  private async getCartId(){
  //    this.auth.user$.subscribe(currentUser => {
  //     if (currentUser){
  //       this.cartId = currentUser.uid
  //     }
  //     else this.cartId = this.firestore.createId()

  //     console.log("cartId: " + this.cartId)
  //    })
  //    console.log("cartId: " + this.cartId)

  //  }

  getCart(){
    return this.firestore.collection("shopping-carts").doc(this.cartId)
      .collection("items").snapshotChanges()
  }


}
