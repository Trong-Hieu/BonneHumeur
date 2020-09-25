import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BonneHumeur';

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private firestore: AngularFirestore,
    router: Router
  ){
    auth.user$.subscribe(currentUser => {
      if (currentUser) {

        this.firestore.collection("Users").doc(currentUser.uid).get()
          .subscribe(user => {
            if (!user.exists) userService.save(currentUser);
          })

        // Lưu user vào firebase database
        // userService.save(currentUser);
        // nếu có user đăng nhập vào thỉ redirective lại cái trang lưu trữ
        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    })
  }

}
