import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
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
import { AskFormComponent } from './Outside-Oauth/ask-form/ask-form.component';
import { MyCompanyInfoComponent } from './Outside-Oauth/my-company-info/my-company-info.component';
import { LandingPageComponent } from './Outside-Oauth/landing-page/landing-page.component';
import { PriceInfoComponent } from './Outside-Oauth/price-info/price-info.component';
import { UsageComponent } from './usage/usage.component';
import { UsageSidemenuComponent } from './usage/usage-sidemenu/usage-sidemenu.component';
import { SoftInfoComponent } from './usage/soft-info/soft-info.component';
import { AddMemberComponent } from './usage/add-member/add-member.component';
import { UsageLoginComponent } from './usage/usage-login/usage-login.component';

import { TaikaiComponent } from './Outside-Oauth/taikai/taikai.component';
import { ProgressOutDialogComponent } from './Outside-Oauth/progress-out-dialog/progress-out-dialog.component';
import { ErrorOutDialogComponent } from './Outside-Oauth/error-out-dialog/error-out-dialog.component';
import { ClaimAddComponent } from './usage/claim-add/claim-add.component';
import { TaiouAddComponent } from './usage/taiou-add/taiou-add.component';
import { KoukaAddComponent } from './usage/kouka-add/kouka-add.component';
import { SearchComponent } from './usage/search/search.component';
import { ImageAddComponent } from './usage/image-add/image-add.component';
import { TimeLineComponent } from './usage/time-line/time-line.component';
import { NavTitleComponent } from './header/nav-title/nav-title.component';






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
    RiyouKiyakuComponent,
    AskFormComponent,
    MyCompanyInfoComponent,
    LandingPageComponent,
    PriceInfoComponent,
    UsageComponent,
    UsageSidemenuComponent,
    SoftInfoComponent,
    AddMemberComponent,
    UsageLoginComponent,
    TaikaiComponent,
    ProgressOutDialogComponent,
    ErrorOutDialogComponent,
    ClaimAddComponent,
    TaiouAddComponent,
    KoukaAddComponent,
    SearchComponent,
    ImageAddComponent,
    TimeLineComponent,
    NavTitleComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    ModalModule.forRoot(),
    JsonpModule,
  ],

  providers: [SignInGuard,OauthService,OauthInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
