import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MainComponent} from "./main/main.component";
import {ClaimListComponent} from "./claim-info/claim-list/claim-list.component";
import {ImageInfoComponent} from "./claim-info/image-info/image-info.component";
import {AddClaimComponent} from "./claim-info/add-claim/add-claim.component";
import {AddTaiouComponent} from "./claim-info/add-taiou/add-taiou.component";
import {AddGeninComponent} from "./claim-info/add-genin/add-genin.component";
import {AddTaisakuComponent} from "./claim-info/add-taisaku/add-taisaku.component";
import {AddKoukaComponent} from "./claim-info/add-kouka/add-kouka.component";
import {EditClaimComponent} from "./claim-info/edit-claim/edit-claim.component";
import {AddEmployeeComponent} from "./employee-info/add-employee/add-employee.component";
import {CompanyInfoComponent} from "./company-info/company-info.component";
import {COM_ROUTES} from "./company-info/Company.routing";
import {AddBranchOfficeComponent} from "./employee-info/add-branch-office/add-branch-office.component";
import {AddDepartmentComponent} from "./employee-info/add-department/add-department.component";
import {TopClaimComponent} from "./claim-info/top-claim/top-claim.component";
import {CLAIM_ROUTES} from "./claim-info/top-claim/claim-routing";
import {CLAIMALL_ROUTES} from "./claim-info/claim-list/claim-routing";
import {SelectEditComponent} from "./select-edit/select-edit.component";
import {SelectSyubetuComponent} from "./select-edit/select-syubetu/select-syubetu.component";
import {SelectTaisakuComponent} from "./select-edit/select-taisaku/select-taisaku.component";
import {SelectTaiouComponent} from "./select-edit/select-taiou/select-taiou.component";
import {EDIT_CLAIM_ROUTES} from "./claim-info/edit-claim/edit-claim-routing";
import {TopInsideComponent} from "./top-inside/top-inside.component";
import {EditCompanyInfoComponent} from "./company-info/edit-company-info/edit-company-info.component";
import {TopClaimEditComponent} from "./claim-info/top-claim/top-claim-edit/top-claim-edit.component";
import {EditClaimMainComponent} from "./claim-info/top-claim/edit-claim-main/edit-claim-main.component";
import {EDITCLAIMMAIN_ROUTES} from "./claim-info/top-claim/edit-claim-main/edit-claim-main.routing";
import {ViewTimeLineComponent} from "./claim-info/view-time-line/view-time-line.component";
import {AdminComponent} from "./Admin/admin.component";
import {ADMIN_ROUTES} from "./Admin/admin.routing";
import {TaiakiEditComponent} from "./taiaki-edit/taiaki-edit.component";
import {PlanChangeComponent} from "./plan-change/plan-change.component";
import {EditInfoComponent} from "./Admin/edit-info/edit-info.component";
import {EDITINFO_ROUTES} from "./Admin/edit-info/editinfo.routing";
import {USAGE_ROUTES} from "../usage/usage.routing";
import {UsageComponent} from "../usage/usage.component";
import {Usage2Component} from "./usage2/usage2.component";
import {USAGE2_ROUTES} from "./usage2/usage2.routing";
import {Price2InfoComponent} from "./price2-info/price2-info.component";
import {Privacy2PolicyComponent} from "./privacy2-policy/privacy2-policy.component";
import {Riyou2KiyakuComponent} from "./riyou2-kiyaku/riyou2-kiyaku.component";
import {Ask2FormComponent} from "./ask2-form/ask2-form.component";
import {Price3InfoComponent} from "./price3-info/price3-info.component";
/**
 * Created by hp on 2017/02/18.
 */
const IN_ROUTES: Routes = [
  {path:'',component:MainComponent,children:[
    { path: '',  redirectTo: '/top',  pathMatch: 'full'},
    { path: 'list',component:ClaimListComponent,children:CLAIMALL_ROUTES},
    { path: 'image',component:ImageInfoComponent},
    { path: 'addclaim',component:AddClaimComponent},
    { path: 'topclaim',component:TopClaimComponent,children:CLAIM_ROUTES},
    { path: 'addemployee',component:AddEmployeeComponent},
    { path: 'addbranchoffice',component:AddBranchOfficeComponent},
    { path: 'adddepartment',component:AddDepartmentComponent},
    { path: 'companyInfo', component: CompanyInfoComponent ,children:COM_ROUTES},
    { path: 'selectedit',component:SelectSyubetuComponent},
    { path: 'selecttaiouedit',component:SelectTaiouComponent},
    { path: 'selecttaisakuedit',component:SelectTaisakuComponent},
    { path: 'editclaim',component:EditClaimComponent,children:EDIT_CLAIM_ROUTES},
    { path: 'topinside',component:TopInsideComponent},
   { path: 'editclaimmain',component:EditClaimMainComponent,children:EDITCLAIMMAIN_ROUTES},
    { path: 'viewtimeline',component:ViewTimeLineComponent},
     { path: 'admin',component:AdminComponent,children:ADMIN_ROUTES},
    // { path: 'taikaiedit',component:TaiakiEditComponent},
    // { path: 'planchange',component:PlanChangeComponent},
    { path: 'editinfo',component:EditInfoComponent,children:EDITINFO_ROUTES},
    { path: 'usage2', component: Usage2Component,children: USAGE2_ROUTES},
    { path: 'priceinfo2', component: Price2InfoComponent},
    { path: 'priceinfo3', component: Price3InfoComponent},
    { path: 'privacypolicy2', component: Privacy2PolicyComponent},
    { path: 'riyoukiyaku2', component: Riyou2KiyakuComponent},
    { path: 'askform2', component: Ask2FormComponent},
  ]}

];
export const InsideRouting : ModuleWithProviders = RouterModule.forChild(IN_ROUTES);
