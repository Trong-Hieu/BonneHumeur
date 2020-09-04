import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'
import { ItemModel } from '../Model/ItemModel';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getItem() {
    return this.firestore.collection('Items').snapshotChanges()
  }

  createItem(item: ItemModel) {
    return this.firestore.collection('Items').add(item)
  }

  deleteItem(itemId: string){
    this.firestore.collection("Items").doc(itemId).delete()
  }



}
