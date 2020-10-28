import { Component, OnInit } from '@angular/core';
import { productModel } from '../Model/productModel';
import { shoppingCartItem } from '../Model/shopping-cart-item';
import { AuthService } from '../Services/auth.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart$
  cart: shoppingCartItem[] = []
  cartTotal

  constructor(
    private cartService: CartService,
    private auth: AuthService
  ) { }

  ngOnInit(): void{

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

  addToCart(product: productModel){
    this.cartService.addToCart(product)
  }

  removeFromCart(product: productModel){
    this.cartService.removeFromCart(product)
  }


}
