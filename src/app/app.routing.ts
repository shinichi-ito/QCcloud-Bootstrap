import {Routes, RouterModule} from "@angular/router";
import {TopComponent} from "./Outside-Oauth/top/top.component";
import {ModuleWithProviders} from "@angular/core";
import {COM_ROUTES} from "./Inside-Oauth/company-info/Company.routing";
import {CompanyInfoComponent} from "./Inside-Oauth/company-info/company-info.component";
import {SignInComponent} from "./Outside-Oauth/sign-in/sign-in.component";
import {SignUpComponent} from "./Outside-Oauth/sign-up/sign-up.component";
import {SignInGuard} from "./Outside-Oauth/signin.Guard";
/**
 * Created by hp on 2017/02/18.
 */



const APP_ROUTES: Routes = [
  { path: '',  redirectTo: '/top',  pathMatch: 'full'},
  { path: 'top', component: TopComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'main',loadChildren:'app/Inside-Oauth/Inside.module#InsideModule',canActivate: [SignInGuard]},



];
export const routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
