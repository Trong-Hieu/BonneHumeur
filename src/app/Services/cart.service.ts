import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { productModel } from '../Model/productModel';
import { shoppingCartItem } from '../Model/shopping-cart-item';
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

   getCart(){
    return this.firestore.collection("shopping-carts").doc(this.cartId)
      .collection("items").snapshotChanges()
  }
    clearCart(){
      let cart = []
      this.firestore.collection("shopping-carts").doc(this.cartId)
      .collection("items").snapshotChanges().subscribe(data =>{
        cart = data.map(e =>{
          return {
            id: e.payload.doc.id,
            product: e.payload.doc.get("product"),
            quantity: e.payload.doc.get("quantity"),
            totalPrice: e.payload.doc.get("quantity") * e.payload.doc.get("product.price")

          } as shoppingCartItem
        })
        for (let item of cart){
          this.firestore.collection("shopping-carts").doc(this.cartId)
            .collection("items").doc(item.id).delete()
        }

      })


        // .then(function() {
        //   alert("Cart successfully deleted!");
        // }).catch(function(error) {
        //   console.error("Error removing Cart: ", error);
        // });
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



}
