import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/Model/productModel';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-products-manage',
  templateUrl: './admin-products-manage.component.html',
  styleUrls: ['./admin-products-manage.component.css']
})
export class AdminProductsManageComponent implements OnInit {

  products: productModel[] = []
  filteredProducts: productModel[] = []

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(data => {
      this.filteredProducts = data.map(e => {
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

      this.products = this.filteredProducts
    })
  }

  filter(query: string){
    console.log(query);
    this.filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

}
