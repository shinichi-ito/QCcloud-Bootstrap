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
/**
 * Created by hp on 2017/02/18.
 */
const IN_ROUTES: Routes = [
  {path:'',component:MainComponent,children:[
    { path: '',  redirectTo: '/top',  pathMatch: 'full'},
    { path: 'list',component:ClaimListComponent},
    { path: 'image',component:ImageInfoComponent},
    { path: 'addclaim',component:AddClaimComponent},
    { path: 'editclaim',component:EditClaimComponent},
    { path: 'topclaim',component:TopClaimComponent,children:CLAIM_ROUTES},
    { path: 'addemployee',component:AddEmployeeComponent},
    { path: 'addbranchoffice',component:AddBranchOfficeComponent},
    { path: 'adddepartment',component:AddDepartmentComponent},
    { path: 'companyInfo', component: CompanyInfoComponent ,children:COM_ROUTES},




  ]}

];
export const InsideRouting : ModuleWithProviders = RouterModule.forChild(IN_ROUTES);
