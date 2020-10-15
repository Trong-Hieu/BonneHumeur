import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productModel } from '../Model/productModel';
import { ProductService } from '../Services/product.service';
// import {  map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: productModel[] = []
  isFavorite: Boolean[] = []
  category
  subcategory
  filteredProducts: productModel[] = []

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    // this.category = route.snapshot.paramMap.get('category')
    // this.subcategory = route.snapshot.paramMap.get('subcategory')

    // => khi click vào một trang mới, nó sẽ chuyển hướng đến trang mới
    // nhưng các giá trị của category & subcategory lại không thay đổi
    // (snapshot là một sự kiện chỉ được kích hoạt khi component được tạo
    // do đó ta có thể thấy khi click thì component ko được tải lại)
    // => giải phải: sử dụng subcription để nhận biết khi tham số của URL
    // thay đổi trong router hiện tại.


    this.productService.getProduct().subscribe(data => {
      this.products = data.map(e => {
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

      console.log(this.products)

      // sử dụng subcription để nhận biết url thay đổi tham số
      this.route.paramMap.subscribe(params => {

        this.category = params.get('category')
        this.subcategory = params.get('subcategory')

        this.filteredProducts = (this.category && this.subcategory) ?
        this.products.filter(product => {
          return (product.category === this.category && product.subcategory === this.subcategory);
          // product.subcategory === this.subcategory;
        }) : this.products

        console.log(this.filteredProducts)

      });

      for (let p of this.filteredProducts){
        console.log("index:" + this.filteredProducts.indexOf(p))
        this.isFavorite.push(true)
      }

      })

      console.log(this.products)
      console.log(this.category)
      console.log(this.subcategory)
  }

  ngOnInit(): void {

  }

  addToFavorite(i) {
    this.isFavorite[i] = !this.isFavorite[i]
    console.log(this.isFavorite[i])
  }

}
