import {Routes} from "@angular/router";
import {AddCompanyInfoComponent} from "./add-company-info/add-company-info.component";
import {EditCompanyInfoComponent} from "./edit-company-info/edit-company-info.component";
/**
 * Created by hp on 2017/02/18.
 */
export const COM_ROUTES: Routes = [
 { path: 'addCompanyInfo', component:AddCompanyInfoComponent},
  { path: 'editcompanyinfo',component:EditCompanyInfoComponent},
];
