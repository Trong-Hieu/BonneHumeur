import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { productModel } from '../Model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestore: AngularFirestore,
    private firebaseStorage: AngularFireStorage
  ) { }

  getProduct(){
    return this.firestore.collection("products").snapshotChanges()
  }

  create(product: productModel){
    return this.firestore.collection("products").add(product)
  }

  get(productId){
    return this.firestore.collection("products").doc(productId).valueChanges()
  }

  update(productID, product){
    return this.firestore.collection("products").doc(productID).set(product)
  }

  delete(productID){
    this.firestore.collection("products").doc(productID).delete()
  }

  uploadImg(upload: File){
    return this.firebaseStorage.upload(upload.name, upload).snapshotChanges()
  }
}
