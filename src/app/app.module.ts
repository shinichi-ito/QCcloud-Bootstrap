import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopComponent } from './Outside-Oauth/top/top.component';
import { HeaderComponent } from './header/header.component';
import {routing} from "./app.routing";
import {AngularFireModule} from "angularfire2";
import {CompanyInfoComponent} from "./Inside-Oauth/company-info/company-info.component";
import {AddCompanyInfoComponent} from "./Inside-Oauth/company-info/add-company-info/add-company-info.component";
import {PrivacyPolicyComponent} from "./Inside-Oauth/company-info/privacy-policy/privacy-policy.component";
import {RiyouKiyakuComponent} from "./Inside-Oauth/company-info/riyou-kiyaku/riyou-kiyaku.component";
import {DataTableModule} from "angular2-datatable";
import {InsideService} from "./Inside-Oauth/Inside.service";
import { SignInComponent } from './Outside-Oauth/sign-in/sign-in.component';
import { SignUpComponent } from './Outside-Oauth/sign-up/sign-up.component';

export const firebaseConfig = {                     //対象は　qccloud-asia-northeast1
  apiKey: "AIzaSyDCIMKBP2jorKKBJaCXtm3024C1IHD-UCA",
  authDomain: "qccloud-asia-northeast1.firebaseapp.com",
  databaseURL: "https://qccloud-asia-northeast1.firebaseio.com",
  storageBucket: "qccloud-asia-northeast1.appspot.com",
  messagingSenderId: "194462330508"
};

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
