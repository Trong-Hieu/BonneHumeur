import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { UserModel } from '../Model/UserModel';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: UserModel

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.appUser$.subscribe(appUser => this.user = appUser)
  }

  logOut(){
    this.auth.logout()
  }

  logIn(){
    this.auth.login()
  }

}
