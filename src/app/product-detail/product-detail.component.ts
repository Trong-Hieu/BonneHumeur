import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { productModel } from '../Model/productModel';
import { AuthService } from '../Services/auth.service';
import { CartService } from '../Services/cart.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string
  product

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param =>{
      this.productId = param.get("id")
      this.productService.get(this.productId).pipe(take(1)).subscribe(p =>{
        this.product = p as productModel
        this.product.id = this.productId
        console.log("product: " + this.product)
      })
    })
  }

  addToCart(product: productModel){
      this.cartService.addToCart(product)
  }

}
