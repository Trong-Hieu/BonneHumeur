import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { UserModel } from '../Model/UserModel';
import { FavoriteService } from '../Services/favorite.service';
import { productModel } from '../Model/productModel';
import { ProductService } from '../Services/product.service';
import { shoppingCartItem } from '../Model/shopping-cart-item';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: UserModel
  favoriteProducts: productModel[] = []
  favoriteCount
  cartItemsCount

  cart: shoppingCartItem[] = []

  constructor(
    private auth: AuthService,
    private favoriteService: FavoriteService,
    private productService: ProductService,
    private cartService: CartService,
  ) {
    this.productService.getProduct().subscribe(() => {
      this.favoriteService.getFavorite().subscribe(data =>{
        this.favoriteProducts = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.get("name"),
            brand: e.payload.doc.get("brand"),
            category: e.payload.doc.get("category"),
            subcategory: e.payload.doc.get("subcategory"),
            price: e.payload.doc.get("price"),
            img: e.payload.doc.get("img"),
            description: e.payload.doc.get("description"),
            amount: e.payload.doc.get("amount")
          } as productModel
        })

        this.favoriteCount = 0
        console.log("favoriteP:" + this.favoriteProducts)
        for (let f in this.favoriteProducts){
          this.favoriteCount++
          console.log("count: " + this.favoriteCount)
        }
      })

      this.cartService.getCart().subscribe(data =>{
        this.cart = data.map(e =>{
          return {
            id: e.payload.doc.id,
            product: e.payload.doc.get("product"),
            quantity: e.payload.doc.get("quantity"),
            totalPrice: e.payload.doc.get("quantity") * e.payload.doc.get("product.price")

          } as shoppingCartItem
        })
        this.cartItemsCount = 0
        for (let item of this.cart){
          this.cartItemsCount += item.quantity
        }
        console.log(this.cartItemsCount)
      })
    })
  }

  ngOnInit(): void {
    this.auth.appUser$.subscribe(appUser => this.user = appUser)
  }

  logOut(){
    this.auth.logout()
    location.reload()
  }

  logIn(){
    this.auth.login()
  }

}
