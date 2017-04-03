import {Routes} from "@angular/router";
import {SoftInfoComponent} from "./soft-info/soft-info.component";
import {AddMemberComponent} from "./add-member/add-member.component";
import {UsageLoginComponent} from "./usage-login/usage-login.component";
import {ClaimAddComponent} from "./claim-add/claim-add.component";
import {TaiouAddComponent} from "./taiou-add/taiou-add.component";
/**
 * Created by hp on 2017/03/14.
 */
export const USAGE_ROUTES: Routes = [
  { path: 'softinfo',component:SoftInfoComponent},
  { path: 'addmember',component: AddMemberComponent },
  { path: 'usagelogin',component:UsageLoginComponent},
  { path: 'usageclaimadd',component:ClaimAddComponent},
  { path: 'usagetaiouadd',component:TaiouAddComponent},
];
