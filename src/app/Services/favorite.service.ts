import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { productModel } from '../Model/productModel';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoriteID

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService
  ) {

      this.auth.user$.subscribe(currentUser => {
        if (currentUser){
          this.favoriteID = currentUser.uid
        }
        else this.favoriteID = firestore.createId()
      })
  }

  addToFavorite(productId, product: productModel){
    return this.firestore.collection("favorite").doc(this.favoriteID)
      .collection("Fproducts").doc(productId).set(product)
  }

  getFavorite(){
    return this.firestore.collection("favorite").doc(this.favoriteID)
      .collection("Fproducts").snapshotChanges()
  }

  removeFavorite(productID){
    this.firestore.collection("favorite").doc(this.favoriteID)
      .collection("Fproducts").doc(productID).delete()
  }

  create(){
    this.auth.user$.subscribe(currentUser => {
      if (currentUser){
        return this.firestore.collection("favorite").doc(currentUser.uid)
      }
    })
  }


}
