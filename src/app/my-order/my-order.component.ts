import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { shoppingCartItem } from '../Model/shopping-cart-item';
import { AuthService } from '../Services/auth.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  myOrder = []

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(() => {
      this.orderService.getMyOrder().snapshotChanges().subscribe(data =>{
        this.myOrder = data.map(e => {
          return {
            id: e.payload.doc.id,
            status: e.payload.doc.get("status"),
            orderDate: e.payload.doc.get("orderDate"),
            items: []
          }
        })
        for (let order of this.myOrder){
          console.log("my order: " + order.id)
          this.orderService.getMyOrder().doc(order.id).collection("items")
            .snapshotChanges().subscribe(data =>{
            order.items = data.map(e =>{
                return {
                  id: e.payload.doc.id,
                  product: e.payload.doc.get("product"),
                  quantity: e.payload.doc.get("quantity"),
                  totalPrice: e.payload.doc.get("quantity") * e.payload.doc.get("product.price")
                } as shoppingCartItem
              })
              console.log("order items: " + order.items)
              for (let item of order.items){

              }
            })

        }
        // console.log("my order: " + this.myOrder)
      })
    })
  }

}
