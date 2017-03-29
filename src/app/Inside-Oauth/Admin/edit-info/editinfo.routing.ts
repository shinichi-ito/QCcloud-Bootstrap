import {Routes} from "@angular/router";
import {CardEditComponent} from "./card-edit/card-edit.component";
import {TaiakiEditComponent} from "../../taiaki-edit/taiaki-edit.component";
import {PlanChangeComponent} from "../../plan-change/plan-change.component";
/**
 * Created by hp on 2017/03/29.
 */
export const EDITINFO_ROUTES: Routes = [
  { path: 'cardedit',component:CardEditComponent},
  { path: 'taikaiedit',component:TaiakiEditComponent},
  { path: 'planchange',component:PlanChangeComponent},

];
