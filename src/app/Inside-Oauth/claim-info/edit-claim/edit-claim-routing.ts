import {Routes} from "@angular/router";
import {SelectEditClaimComponent} from "./select-edit-claim/select-edit-claim.component";
import {ChangeClaimComponent} from "./change-claim/change-claim.component";
/**
 * Created by hp on 2017/03/03.
 */
export const EDIT_CLAIM_ROUTES: Routes = [
  { path: 'selecteditclaim',component:SelectEditClaimComponent},
  { path: 'changeclaim',component:ChangeClaimComponent},

];
