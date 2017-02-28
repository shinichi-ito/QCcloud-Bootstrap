import {Routes} from "@angular/router";
import {ListTaisakuComponent} from "./list-taisaku/list-taisaku.component";
import {InputTaisakuComponent} from "./input-taisaku/input-taisaku.component";
import {ImageInfoComponent} from "../image-info/image-info.component";
/**
 * Created by hp on 2017/02/25.
 */
export const TAISAKU_ROUTES: Routes = [
  { path: 'listtaisaku',component:ListTaisakuComponent},
  { path: 'inputtaisaku',component:InputTaisakuComponent},
  { path: 'addimagetaisaku',component:ImageInfoComponent},
];
