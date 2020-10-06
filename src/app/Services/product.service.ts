import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getProduct(){
    return this.firestore.collection("products").snapshotChanges()
  }
}
