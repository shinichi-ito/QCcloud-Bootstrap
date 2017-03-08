import {Routes, RouterModule} from "@angular/router";
import {TopComponent} from "./Outside-Oauth/top/top.component";
import {ModuleWithProviders} from "@angular/core";
import {COM_ROUTES} from "./Inside-Oauth/company-info/Company.routing";
import {CompanyInfoComponent} from "./Inside-Oauth/company-info/company-info.component";
import {SignInComponent} from "./Outside-Oauth/sign-in/sign-in.component";
import {SignUpComponent} from "./Outside-Oauth/sign-up/sign-up.component";
import {SignInGuard} from "./Outside-Oauth/signin.Guard";
import {PrivacyPolicyComponent} from "./Outside-Oauth/privacy-policy/privacy-policy.component";
import {RiyouKiyakuComponent} from "./Outside-Oauth/riyou-kiyaku/riyou-kiyaku.component";
import {AskFormComponent} from "./Outside-Oauth/ask-form/ask-form.component";
import {MyCompanyInfoComponent} from "./Outside-Oauth/my-company-info/my-company-info.component";
import {LandingPageComponent} from "./Outside-Oauth/landing-page/landing-page.component";
/**
 * Created by hp on 2017/02/18.
 */



const APP_ROUTES: Routes = [
  { path: '',  redirectTo: '/landing',  pathMatch: 'full'},
  { path: 'top', component: TopComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'privacypolicy', component: PrivacyPolicyComponent},
  { path: 'riyoukiyaku', component: RiyouKiyakuComponent},
  { path: 'askform', component: AskFormComponent},
  { path: 'lotsjoys', component: MyCompanyInfoComponent},
  { path: 'main',loadChildren:'app/Inside-Oauth/Inside.module#InsideModule',canActivate: [SignInGuard]},
  { path: 'landing', component: LandingPageComponent},


];
export const routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
