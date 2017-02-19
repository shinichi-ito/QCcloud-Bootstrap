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
import {InsideService} from "./Inside.service";
import { ImageInfoComponent } from './claim-info/image-info/image-info.component';
import { AddImageFileDirective } from './claim-info/image-info/add-image-file.directive';
import { SetImageFileComponent } from './claim-info/image-info/set-image-file/set-image-file.component';
import {JsonpModule} from "@angular/http";
import {ImageService} from "./claim-info/image-info/image.service";
import { ImageDetailComponent } from './claim-info/image-info/image-detail/image-detail.component';
import { ImageListComponent } from './claim-info/image-info/image-list/image-list.component';
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
    DataFilterPipe,
    ImageInfoComponent,
    AddImageFileDirective,
    SetImageFileComponent,
    ImageDetailComponent,
    ImageListComponent
 ],
  imports:[
    InsideRouting,
    AngularFireModule.initializeApp(firebaseConfig),
    DataTableModule,
    CommonModule,
    FormsModule,
    JsonpModule
  ],

  providers:[ImageService,InsideService ]
})
export class InsideModule{

}
