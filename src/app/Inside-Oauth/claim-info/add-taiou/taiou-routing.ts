import {Routes} from "@angular/router";
import {ListTaiouComponent} from "./list-taiou/list-taiou.component";
import {InputTaiouComponent} from "./input-taiou/input-taiou.component";
import {ImageInfoComponent} from "../image-info/image-info.component";
/**
 * Created by hp on 2017/02/25.
 */
export const TAIOU_ROUTES: Routes = [
  { path: 'listtaiou',component:ListTaiouComponent},
  { path: 'inputtaiou',component:InputTaiouComponent},
  { path: 'addimagetaiou',component:ImageInfoComponent},
];
