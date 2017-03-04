import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TopComponent } from './Outside-Oauth/top/top.component';
import { HeaderComponent } from './header/header.component';
import {routing} from "./app.routing";
import {AngularFireModule} from "angularfire2";
import { SignInComponent } from './Outside-Oauth/sign-in/sign-in.component';
import { SignUpComponent } from './Outside-Oauth/sign-up/sign-up.component';
import {SignInGuard} from "./Outside-Oauth/signin.Guard";
import {OauthService} from "./Outside-Oauth/oauth.service";
import {OauthInfoService} from "./Inside-Oauth/oauth-info.service";
import { PrivacyPolicyComponent } from './Outside-Oauth/privacy-policy/privacy-policy.component';
import { RiyouKiyakuComponent } from './Outside-Oauth/riyou-kiyaku/riyou-kiyaku.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import {NotificationBarModule} from "angular2-notification-bar";





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
    PrivacyPolicyComponent,
    RiyouKiyakuComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    ModalModule.forRoot(),
     NotificationBarModule
  ],

  providers: [SignInGuard,OauthService,OauthInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
