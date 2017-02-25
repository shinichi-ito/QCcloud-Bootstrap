import {ImageInfoComponent} from "../image-info/image-info.component";
import {ListGeninComponent} from "./list-genin/list-genin.component";
import {InputGeninComponent} from "./input-genin/input-genin.component";
import {Routes} from "@angular/router";
/**
 * Created by hp on 2017/02/25.
 */
export const GENIN_ROUTES: Routes = [
  { path: 'listgenin',component:ListGeninComponent},
  { path: 'inputgenin',component:InputGeninComponent},
  { path: 'addimagetaiou',component:ImageInfoComponent},
];
