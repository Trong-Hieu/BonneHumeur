import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shoppingCartItem } from '../Model/shopping-cart-item';
import { AuthService } from '../Services/auth.service';
import { CartService } from '../Services/cart.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart: shoppingCartItem[] = []
  cartTotal

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(() =>{
      // this.cart$ = this.cartService.getCart()
      this.cartService.getCart().subscribe(data =>{
        this.cart = data.map(e =>{
          return {
            id: e.payload.doc.id,
            product: e.payload.doc.get("product"),
            quantity: e.payload.doc.get("quantity"),
            totalPrice: e.payload.doc.get("quantity") * e.payload.doc.get("product.price")

          } as shoppingCartItem
        })
        console.log(this.cart)
        this.cartTotal = 0
        for (let item of this.cart){
          this.cartTotal += item.totalPrice
        }
        console.log(this.cartTotal)
      })

    })
  }

  addToOrder(orderInfo){
    console.log(orderInfo)
    this.orderService.addToOrder(orderInfo).then(() =>{
      alert("order successfully")
      this.router.navigate(['my/orders'])
    })

  }

}
