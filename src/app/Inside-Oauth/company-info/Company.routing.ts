import {Routes} from "@angular/router";
import {AddCompanyInfoComponent} from "./add-company-info/add-company-info.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {RiyouKiyakuComponent} from "./riyou-kiyaku/riyou-kiyaku.component";
/**
 * Created by hp on 2017/02/18.
 */
export const COM_ROUTES: Routes = [
  { path: 'addCompanyInfo', component:AddCompanyInfoComponent},
  { path: 'riyoukiyaku', component:RiyouKiyakuComponent},
  { path: 'privacypolicy', component:PrivacyPolicyComponent}
];
