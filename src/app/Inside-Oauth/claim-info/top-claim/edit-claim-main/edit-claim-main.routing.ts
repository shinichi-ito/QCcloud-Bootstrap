import {Routes} from "@angular/router";
import {EditClaimDataComponent} from "./edit-claim-data/edit-claim-data.component";
import {ImageInfoComponent} from "../../image-info/image-info.component";
/**
 * Created by hp on 2017/03/10.
 */




export const EDITCLAIMMAIN_ROUTES: Routes = [
  { path: 'editclaimdata',component:EditClaimDataComponent},
  { path: 'addimageclaim',component:ImageInfoComponent}



];
