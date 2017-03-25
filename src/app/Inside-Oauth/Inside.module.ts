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
import {
  DatepickerModule, RatingModule, TimepickerModule, ModalModule, DropdownModule, ProgressbarModule
} from "ng2-bootstrap";
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
import { TaiouDialogComponent } from './Dialog/edit-dialog/taiou-dialog/taiou-dialog.component';
import { TaisakuDialogComponent } from './Dialog/edit-dialog/taisaku-dialog/taisaku-dialog.component';
import { GeninDialogComponent } from './Dialog/edit-dialog/genin-dialog/genin-dialog.component';
import { KoukaDialogComponent } from './Dialog/edit-dialog/kouka-dialog/kouka-dialog.component';
import { CommentDialogComponent } from './Dialog/edit-dialog/comment-dialog/comment-dialog.component';
import { TaiouListAllComponent } from './claim-info/claim-list/taiou-list-all/taiou-list-all.component';
import { TaisakuListAllComponent } from './claim-info/claim-list/taisaku-list-all/taisaku-list-all.component';
import { ClaimListAllComponent } from './claim-info/claim-list/claim-list-all/claim-list-all.component';
import { GeninListAllComponent } from './claim-info/claim-list/genin-list-all/genin-list-all.component';
import { KoukaListAllComponent } from './claim-info/claim-list/kouka-list-all/kouka-list-all.component';
import {InsideMainService} from "./inside-main.service";
import { SelectEditComponent } from './select-edit/select-edit.component';
import { SelectSyubetuComponent } from './select-edit/select-syubetu/select-syubetu.component';
import { SelectTaiouComponent } from './select-edit/select-taiou/select-taiou.component';
import { SelectTaisakuComponent } from './select-edit/select-taisaku/select-taisaku.component';
import { ProgressDialogComponent } from './Dialog/progress-dialog/progress-dialog.component';
import { SelectEditClaimComponent } from './claim-info/edit-claim/select-edit-claim/select-edit-claim.component';
import { ChangeClaimComponent } from './claim-info/edit-claim/change-claim/change-claim.component';
import { CommentDeleteDialogComponent } from './Dialog/delete-dialog/comment-delete-dialog/comment-delete-dialog.component';
import { GeninDeleteDialogComponent } from './Dialog/delete-dialog/genin-delete-dialog/genin-delete-dialog.component';
import { KoukaDeleteDialogComponent } from './Dialog/delete-dialog/kouka-delete-dialog/kouka-delete-dialog.component';
import { TaiouDeleteDialogComponent } from './Dialog/delete-dialog/taiou-delete-dialog/taiou-delete-dialog.component';
import { TaisakuDeleteDialogComponent } from './Dialog/delete-dialog/taisaku-delete-dialog/taisaku-delete-dialog.component';
import { ImageDeleteDialogComponent } from './Dialog/delete-dialog/image-delete-dialog/image-delete-dialog.component';
import { ImageDialogComponent } from './Dialog/edit-dialog/image-dialog/image-dialog.component';
import { TopInsideComponent } from './top-inside/top-inside.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { EditCompanyInfoComponent } from './company-info/edit-company-info/edit-company-info.component';
import { NavMainComponent } from './Nav-Inside/nav-main/nav-main.component';
import { NavSabuComponent } from './Nav-Inside/nav-sabu/nav-sabu.component';
import { CheckKoukaComponent } from './Dialog/check-kouka/check-kouka.component';
import { ViewFileComponent } from './Dialog/view-file/view-file.component';
import { NoFileListComponent } from './Dialog/no-file-list/no-file-list.component';
import { EditClaimMainComponent } from './claim-info/top-claim/edit-claim-main/edit-claim-main.component';
import { EditClaimDataComponent } from './claim-info/top-claim/edit-claim-main/edit-claim-data/edit-claim-data.component';
import { SameImageComponent } from './Dialog/same-image/same-image.component';
import { ViewSyousaiComponent } from './Dialog/view-syousai/view-syousai.component';
import { ViewTimeLineComponent } from './claim-info/view-time-line/view-time-line.component';
import { NewsLineComponent } from './Admin/news-line/news-line.component';
import { AdminComponent } from './Admin/admin.component';
import { SideNavComponent } from './Admin/side-nav/side-nav.component';
import { NewsDialogComponent } from './Dialog/edit-dialog/news-dialog/news-dialog.component';
import { CompanyEditComponent } from './Admin/company-edit/company-edit.component';
import { CompanyEditDialogComponent } from './Dialog/edit-dialog/company-edit-dialog/company-edit-dialog.component';
import { TaiouSelectComponent } from './Dialog/taiou-select/taiou-select.component';
import { TaisakuSelectComponent } from './Dialog/taisaku-select/taisaku-select.component';
import { ClaimSelectComponent } from './Dialog/claim-select/claim-select.component';
import { TaiakiEditComponent } from './taiaki-edit/taiaki-edit.component';
import { TaikaiCheckComponent } from './Dialog/taikai-check/taikai-check.component';
import { KoukaSetumeiComponent } from './Dialog/kouka-setumei/kouka-setumei.component';
import {Data2FilterPipe} from "./claim-info/claim-list/data2-filter.pipe";
import { ClaimListAllSyousaiComponent } from './claim-info/claim-list/claim-list-all-syousai/claim-list-all-syousai.component';
import { FileListAllComponent } from './claim-info/claim-list/file-list-all/file-list-all.component';
import {FileSelectFilterPipe} from "./claim-info/claim-list/fileSelect.pipe";
import { ViewFileOtherComponent } from './Dialog/view-file-other/view-file-other.component';
import { PlanChangeComponent } from './plan-change/plan-change.component';
import { ProgressImageDialogComponent } from './Dialog/progress-image-dialog/progress-image-dialog.component';
import { TaisakuViewDialogComponent } from './Dialog/taisaku-view-dialog/taisaku-view-dialog.component';
import {TaiouFilterPipe} from "./claim-info/claim-list/taiouListFilter.pipe";
import {KoukaFilterPipe} from "./claim-info/claim-list/koukaListFilter.pipe";
import {GeninFilterPipe} from "./claim-info/claim-list/geninListFilter.pipe";
import { SuccessDialogComponent } from './Dialog/success-dialog/success-dialog.component';
import { KanriNoDialogComponent } from './Dialog/kanri-no-dialog/kanri-no-dialog.component';




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
    Data2FilterPipe,
    TaiouFilterPipe,
    KoukaFilterPipe,
    FileSelectFilterPipe,
    GeninFilterPipe,
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
    TaiouDialogComponent,
    TaisakuDialogComponent,
    GeninDialogComponent,
    KoukaDialogComponent,
    CommentDialogComponent,
    TaiouListAllComponent,
    TaisakuListAllComponent,
    ClaimListAllComponent,
    GeninListAllComponent,
    KoukaListAllComponent,
    SelectEditComponent,
    SelectSyubetuComponent,
    SelectTaiouComponent,
    SelectTaisakuComponent,
    ProgressDialogComponent,
    SelectEditClaimComponent,
    ChangeClaimComponent,
    CommentDeleteDialogComponent,
    GeninDeleteDialogComponent,
    KoukaDeleteDialogComponent,
    TaiouDeleteDialogComponent,
    TaisakuDeleteDialogComponent,
    ImageDeleteDialogComponent,
    ImageDialogComponent,
    TopInsideComponent,
    SideMenuComponent,
    EditCompanyInfoComponent,
    NavMainComponent,
    NavSabuComponent,
    CheckKoukaComponent,
    ViewFileComponent,
    NoFileListComponent,
    EditClaimMainComponent,
    EditClaimDataComponent,
    SameImageComponent,
    ViewSyousaiComponent,
    ViewTimeLineComponent,
    NewsLineComponent,
    AdminComponent,
    SideNavComponent,
    NewsDialogComponent,
    CompanyEditComponent,
    CompanyEditDialogComponent,
    TaiouSelectComponent,
    TaisakuSelectComponent,
    ClaimSelectComponent,
    TaiakiEditComponent,
    TaikaiCheckComponent,
    KoukaSetumeiComponent,
    ClaimListAllSyousaiComponent,
    FileListAllComponent,
    ViewFileOtherComponent,
    PlanChangeComponent,
    ProgressImageDialogComponent,
    TaisakuViewDialogComponent,
    SuccessDialogComponent,
    KanriNoDialogComponent



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
    ProgressbarModule.forRoot(),
    ReactiveFormsModule
  ],


  providers:[CompanyInfoService,ImageService,InsideService ,InsideMainService]
})
export class InsideModule{

}
