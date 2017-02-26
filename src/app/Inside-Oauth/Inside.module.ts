import {AngularFireModule} from "angularfire2";
import {NgModule} from "@angular/core";
import { MainComponent } from './main/main.component';
import {InsideRouting} from "./Inside.routing";
import { ClaimListComponent } from './claim-info/claim-list/claim-list.component';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from "./claim-info/claim-list/data-filter.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {DatepickerModule, RatingModule, TimepickerModule, ModalModule, DropdownModule} from "ng2-bootstrap";
import {CompanyInfoComponent} from "./company-info/company-info.component";
import {AddCompanyInfoComponent} from "./company-info/add-company-info/add-company-info.component";
import { HeaderClaimComponent } from './claim-info/header-claim/header-claim.component';
import { OrderbyPipe } from './orderby.pipe';
import { AddBranchComponent } from './employee-info/add-branch-office/add-branch/add-branch.component';
import { ListBranchComponent } from './employee-info/add-branch-office/list-branch/list-branch.component';
import { ListDepartmentComponent } from './employee-info/add-department/list-department/list-department.component';
import { AddDepartComponent } from './employee-info/add-department/add-depart/add-depart.component';
import { AddEmloyComponent } from './employee-info/add-employee/add-emloy/add-emloy.component';
import { ListEmpioyeeComponent } from './employee-info/add-employee/list-empioyee/list-empioyee.component';
import {CompanyInfoService} from "./company-info/company-info.service";
import { HeaderMainComponent } from './header-main/header-main.component';
import { TopClaimComponent } from './claim-info/top-claim/top-claim.component';
import { TopClaimEditComponent } from './claim-info/top-claim/top-claim-edit/top-claim-edit.component';
import { ListTaiouComponent } from './claim-info/add-taiou/list-taiou/list-taiou.component';
import { InputTaiouComponent } from './claim-info/add-taiou/input-taiou/input-taiou.component';
import { InputTaisakuComponent } from './claim-info/add-taisaku/input-taisaku/input-taisaku.component';
import { ListTaisakuComponent } from './claim-info/add-taisaku/list-taisaku/list-taisaku.component';
import { InputCommentComponent } from './claim-info/add-comment/input-comment/input-comment.component';
import { ListCommentComponent } from './claim-info/add-comment/list-comment/list-comment.component';
import { InputGeninComponent } from './claim-info/add-genin/input-genin/input-genin.component';
import { ListGeninComponent } from './claim-info/add-genin/list-genin/list-genin.component';
import { InputKoukaComponent } from './claim-info/add-kouka/input-kouka/input-kouka.component';
import { ListKoukaComponent } from './claim-info/add-kouka/list-kouka/list-kouka.component';
import { ErrorDialogComponent } from './Dialog/error-dialog/error-dialog.component';







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
    HeaderClaimComponent,
    OrderbyPipe,
    AddBranchComponent,
    ListBranchComponent,
    ListDepartmentComponent,
    AddDepartComponent,
    AddEmloyComponent,
    ListEmpioyeeComponent,
    HeaderMainComponent,
    TopClaimComponent,
    TopClaimEditComponent,
    ListTaiouComponent,
    InputTaiouComponent,
    InputTaisakuComponent,
    ListTaisakuComponent,
    InputCommentComponent,
    ListCommentComponent,
    InputGeninComponent,
    ListGeninComponent,
    InputKoukaComponent,
    ListKoukaComponent,
    ErrorDialogComponent,


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
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    DropdownModule.forRoot(),
    ReactiveFormsModule
  ],


  providers:[CompanyInfoService,ImageService,InsideService ]
})
export class InsideModule{

}
