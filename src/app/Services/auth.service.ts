import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../Model/UserModel';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase'
import { ActivatedRoute } from '@angular/router'
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
// import  'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Observable xử lý bất đồng bộ, nghĩa là khi gọi hàm có Observable thì ta vẫn có
  // thể xử lý những hàm khác. Tác dụng khi ta gửi hay truyền dữ liệu từ server,
  // phải đợi server phản hồi thì trong khoảng thời gian đợi có thể thực hiện những
  // công việc khác

  // &: scope binding part between HTML and js
  // In the view, you do not use the prefix $scope,
  // you just refer to a property name, like {{username}}.
  user$: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService

  ) {
    this.user$ = afAuth.authState
  }

  login(){
    // Lưu trữ địa chỉ url trước lúc nhấn vào login
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())

    // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
    window.alert("Logout Successed!!!");
  }

  // get user để đc gọi từ nav-bar
  get appUser$(): Observable<UserModel>{
    return this.user$.pipe(
      switchMap(
        (user: firebase.User) => {
          if (user) return this.userService.get(user.uid).valueChanges()

          return of(null)
        }
      ))
  }

}
