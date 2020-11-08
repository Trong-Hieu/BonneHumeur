
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { productModel } from 'src/app/Model/productModel';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @ViewChild("cMen") cMen
  product: productModel = new productModel()
  imgFile: File
  imgUrl: string
  id: string
  uploadProgress = 0

  constructor(
    private productService: ProductService,
    private firebaseStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id){
      this.productService.get(this.id).subscribe((p) =>{
        this.product = p as productModel
        console.log("product: " + this.product)
      })

      // .ref.get().then(p => {
      //   this.product = p.data() as productModel
      //   console.log(p.data())
      // })
      console.log("id: " + this.id);

    }
  }

  ngOnInit(): void {

  }

  brandSelect(event){
    console.log(event.target.value)
    if (event.target.value === "chanel"){
      this.cMen.nativeElement.style.display = "none"
    }
    else this.cMen.nativeElement.style.display = "block"

  }

  onFileSelected(event){
    this.imgFile = event.target.files[0]
    let fireRef = this.firebaseStorage.ref(this.imgFile.name)
    this.productService.uploadImg(this.imgFile)
      .pipe(

        finalize(() => {
          fireRef.getDownloadURL().subscribe( url => {
            this.imgUrl = url
            this.product.img = this.imgUrl
            console.log("url: " + this.imgUrl)
          })
        }),

        map(s => {
          this.uploadProgress = s.bytesTransferred/s.totalBytes * 100
          console.log(this.uploadProgress)
        })
      )
      .subscribe()
  }

  save(product){


    if (this.id) {
      if (this.imgUrl){
        product.img = this.imgUrl
        console.log(product)
        this.productService.update(this.id, product)
          .then(() => alert("Add Product success"))
      }
      else {
        product.img = this.product.img
        console.log(product)
        this.productService.update(this.id, product)
          .then(() => alert("Add Product success"))
      }
    }
    else {
      product.img = this.imgUrl
      console.log(product)
      this.productService.create(product)
        .then(() =>{
          alert("Add Product success")
          window.location.reload()
        })
    }
  }

  delete(){
    if (!confirm("Are you sure to want to delete?")) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
