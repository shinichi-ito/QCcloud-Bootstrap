import {AngularFireModule} from "angularfire2";
import {NgModule} from "@angular/core";
import { MainComponent } from './main/main.component';
import {InsideRouting} from "./Inside.routing";
import { ClaimListComponent } from './claim-info/claim-list/claim-list.component';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from "./claim-info/claim-list/data-filter.pipe";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InsideService} from "./Inside.service";
import { ImageInfoComponent } from './claim-info/image-info/image-info.component';
import { AddImageFileDirective } from './claim-info/image-info/add-image-file.directive';
import { SetImageFileComponent } from './claim-info/image-info/set-image-file/set-image-file.component';
import {JsonpModule} from "@angular/http";
import {ImageService} from "./claim-info/image-info/image.service";
import { ImageDetailComponent } from './claim-info/image-info/image-detail/image-detail.component';
import { ImageListComponent } from './claim-info/image-info/image-list/image-list.component';
import { AddClaimComponent } from './claim-info/add-claim/add-claim.component';
import { AddCommentComponent } from './claim-info/add-comment/add-comment.component';
import { AddTaiouComponent } from './claim-info/add-taiou/add-taiou.component';
import { AddGeninComponent } from './claim-info/add-genin/add-genin.component';
import { AddTaisakuComponent } from './claim-info/add-taisaku/add-taisaku.component';
import { AddKoukaComponent } from './claim-info/add-kouka/add-kouka.component';
import { EditClaimComponent } from './claim-info/edit-claim/edit-claim.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { AddEmployeeComponent } from './employee-info/add-employee/add-employee.component';
import { AddBranchOfficeComponent } from './employee-info/add-branch-office/add-branch-office.component';
import { AddDepartmentComponent } from './employee-info/add-department/add-department.component';
import { InformationComponent } from './information/information.component';
import {DatepickerModule, RatingModule, TimepickerModule} from "ng2-bootstrap";
import {CompanyInfoComponent} from "./company-info/company-info.component";
import {PrivacyPolicyComponent} from "./company-info/privacy-policy/privacy-policy.component";
import {RiyouKiyakuComponent} from "./company-info/riyou-kiyaku/riyou-kiyaku.component";
import {AddCompanyInfoComponent} from "./company-info/add-company-info/add-company-info.component";
import { HeaderClaimComponent } from './claim-info/header-claim/header-claim.component';


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
  ClaimListComponent,
    DataFilterPipe,
    ImageInfoComponent,
    AddImageFileDirective,
    SetImageFileComponent,
    ImageDetailComponent,
    ImageListComponent,
    AddClaimComponent,
    AddCommentComponent,
    AddTaiouComponent,
    AddGeninComponent,
    AddTaisakuComponent,
    AddKoukaComponent,
    EditClaimComponent,
    EmployeeInfoComponent,
    AddEmployeeComponent,
    AddBranchOfficeComponent,
    AddDepartmentComponent,
    InformationComponent,
    CompanyInfoComponent,
    AddCompanyInfoComponent,
    RiyouKiyakuComponent,
    PrivacyPolicyComponent,
    HeaderClaimComponent
 ],
  imports:[
    InsideRouting,
    AngularFireModule.initializeApp(firebaseConfig),
    DataTableModule,
    CommonModule,
    FormsModule,
    JsonpModule,
    DatepickerModule.forRoot(),
    RatingModule.forRoot(),
    TimepickerModule.forRoot()
  ],

  providers:[ImageService,InsideService ]
})
export class InsideModule{

}
