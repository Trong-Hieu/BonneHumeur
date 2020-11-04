import { Component, OnInit } from '@angular/core';
import { productModel } from '../Model/productModel';
import { AuthService } from '../Services/auth.service';
import { CartService } from '../Services/cart.service';
import { FavoriteService } from '../Services/favorite.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favoriteProducts: productModel[] = []

  constructor(
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
      })
    })
   }

  ngOnInit(): void {
  }

  addToCart(product: productModel){
    this.cartService.addToCart(product)
  }
  removeFavourite(product: productModel){
    this.favoriteService.removeFavorite(product.id)
  }

}
