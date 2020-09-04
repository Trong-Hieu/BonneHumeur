import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule} from '@angular/fire/database'
import { environment} from '../environments/environment'
import { FirebaseServiceService } from './Services/firebase-service.service';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [
    FirebaseServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
