import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'
import { ItemModel } from '../Model/ItemModel';
import { AngularFireStorage } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore: AngularFirestore,
    private firebaseStorage: AngularFireStorage
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

  uploadImg(upload: File){
    return this.firebaseStorage.upload(upload.name, upload).snapshotChanges()

  }

}
