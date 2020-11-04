import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderInfoModel } from '../Model/orderInfoModel';
import { shoppingCartItem } from '../Model/shopping-cart-item';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cartId: string

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private cartService: CartService,
  ) {
    this.auth.user$.subscribe(currentUser => {
      if (currentUser){
        this.cartId = currentUser.uid
      }
      else this.cartId = firestore.createId()

    })
   }

   async addToOrder(orderInfo){
     // get cart item
    let cartItem = []
    this.firestore.collection("shopping-carts").doc(this.cartId)
      .collection("items")
      .snapshotChanges()
      .subscribe(data =>{
        cartItem = data.map(e =>{
          return {
            id: e.payload.doc.id,
            product: e.payload.doc.get("product"),
            quantity: e.payload.doc.get("quantity"),
            totalPrice: e.payload.doc.get("quantity") * e.payload.doc.get("product.price")

          } as shoppingCartItem
        })
        console.log(cartItem)

        // copy cart items into order
        let orderId = this.firestore.createId()
        for (let item of cartItem){
          console.log(item)
          this.firestore.collection("orders").doc(orderId).collection("items")
            .doc(item.id).set({product: item.product, quantity: item.quantity})

          this.firestore.collection("Users").doc(this.cartId).collection("My_order")
            .doc(orderId).collection("items")
            .doc(item.id).set({product: item.product, quantity: item.quantity})

          // update amount of product
          this.firestore.collection("products").doc(item.id)
            .update({amount: item.product.amount - item.quantity})
        }

        // add order information
        this.firestore.collection("orders").doc(orderId).collection("information")
          .add(orderInfo)

        // set status of order is unship and order date

        let orderDate = new Date().toDateString()

        this.firestore.collection("orders").doc(orderId).set({status: "unship", orderDate: orderDate})
        this.firestore.collection("Users").doc(this.cartId).collection("My_order")
          .doc(orderId).set({status: "unship", orderDate: orderDate})



      })


   }

   getMyOrder(){
     return this.firestore.collection("Users").doc(this.cartId).collection("My_order")
   }

   getAllOrder(){
     return this.firestore.collection("orders")
   }

   shipOder(orderId){
     this.firestore.collection("orders").doc(orderId).update({status: "shipped"})
     this.firestore.collection("Users").doc(this.cartId).collection("My_order")
          .doc(orderId).update({status: "shipped"})
   }
   cancelOder(orderId){
    this.firestore.collection("orders").doc(orderId).update({status: "canceled"})
    this.firestore.collection("Users").doc(this.cartId).collection("My_order")
          .doc(orderId).update({status: "canceled"})
  }
}
