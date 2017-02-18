import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MainComponent} from "./main/main.component";
import {ClaimListComponent} from "./claim-info/claim-list/claim-list.component";
/**
 * Created by hp on 2017/02/18.
 */
const IN_ROUTES: Routes = [
  {path:'',component:MainComponent,children:[
    { path: '',  redirectTo: '/top',  pathMatch: 'full'},
    { path: 'list',component:ClaimListComponent},
  ]}

];
export const InsideRouting : ModuleWithProviders = RouterModule.forChild(IN_ROUTES);
