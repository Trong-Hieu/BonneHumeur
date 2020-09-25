import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserModel } from '../Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  save(userFirebase: firebase.User) {
    let user: UserModel = {
      name: userFirebase.displayName,
      email: userFirebase.email,
      isAdmin: false
    }
    return this.firestore.collection("Users").doc(userFirebase.uid).set(user)
  }

  get(uid: string): AngularFirestoreDocument<UserModel>{
    return this.firestore.collection("Users").doc(uid)
  }

}
