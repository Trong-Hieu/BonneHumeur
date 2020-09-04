import { Component, OnInit, Input } from '@angular/core';
import { FirebaseServiceService } from '../Services/firebase-service.service';
import { ItemModel } from '../Model/ItemModel';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  items: ItemModel[]

  constructor(
    private firebaseService: FirebaseServiceService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {

    this.firebaseService.getItem().subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.get("name")
        } as ItemModel
      })
    })
  }

  createItem(itemName: HTMLInputElement){

    let item: ItemModel = {
      id: this.firestore.createId(),
      name: itemName.value
    }

    this.firebaseService.createItem(item)
    itemName.value = ""

  }

  deleteItem(id: string){
    this.firebaseService.deleteItem(id)
  }

}
