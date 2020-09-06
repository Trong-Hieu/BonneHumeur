import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseServiceService } from '../Services/firebase-service.service';
import { ItemModel } from '../Model/ItemModel';
import { AngularFirestore } from '@angular/fire/firestore'
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  items: ItemModel[]
  imgFile: File
  imgUrl: string
  uploadProgress: number

  constructor(
    private firebaseService: FirebaseServiceService,
    private firestore: AngularFirestore,
    private firebaseStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {

    this.firebaseService.getItem().subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.get("name"),
          imgURL: e.payload.doc.get("imgURL")
        } as ItemModel
      })
    })
  }

  createItem(itemName: HTMLInputElement){


    let item: ItemModel = {
      id: this.firestore.createId(),
      name: itemName.value,
      imgURL: this.imgUrl
    }

    this.firebaseService.createItem(item)
    itemName.value = ""
    this.imgFile = null
    this.uploadProgress = 0;


  }

  deleteItem(id: string){
    this.firebaseService.deleteItem(id)
  }

  onFileSelected(event){

    this.imgFile = event.target.files[0]
    let fireRef = this.firebaseStorage.ref(this.imgFile.name)
    this.firebaseService.uploadImg(this.imgFile)
      .pipe(

        finalize(() => {
          fireRef.getDownloadURL().subscribe( url => {
            this.imgUrl = url
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

}
