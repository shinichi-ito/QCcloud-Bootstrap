import {AngularFireModule} from "angularfire2";
import {NgModule} from "@angular/core";
import { MainComponent } from './main/main.component';
import {InsideRouting} from "./Inside.routing";
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ClaimInfoComponent } from './claim-info/claim-info.component';
import { ClaimListComponent } from './claim-info/claim-list/claim-list.component';
import { AddCompanyInfoComponent } from './company-info/add-company-info/add-company-info.component';
import { RiyouKiyakuComponent } from './company-info/riyou-kiyaku/riyou-kiyaku.component';
import { PrivacyPolicyComponent } from './company-info/privacy-policy/privacy-policy.component';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from "./claim-info/claim-list/data-filter.pipe";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
/**
 * Created by hp on 2017/02/18.
 */
export const firebaseConfig = {                     //対象は　qccloud-asia-northeast1
  apiKey: "AIzaSyDCIMKBP2jorKKBJaCXtm3024C1IHD-UCA",
  authDomain: "qccloud-asia-northeast1.firebaseapp.com",
  databaseURL: "https://qccloud-asia-northeast1.firebaseio.com",
  storageBucket: "qccloud-asia-northeast1.appspot.com",
  messagingSenderId: "194462330508"
};
/**
 * Created by 慎一 on 2017/01/04.
 */
@NgModule({
  declarations:[
  MainComponent,
  ClaimInfoComponent,
  ClaimListComponent,
    DataFilterPipe
 ],
  imports:[
    InsideRouting,
    AngularFireModule.initializeApp(firebaseConfig),
    DataTableModule,
    CommonModule,
    FormsModule
  ],

  providers:[]
})
export class InsideModule{

}
