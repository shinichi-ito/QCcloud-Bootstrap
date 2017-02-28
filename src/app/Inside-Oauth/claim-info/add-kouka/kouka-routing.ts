import {Routes} from "@angular/router";
import {ListKoukaComponent} from "./list-kouka/list-kouka.component";
import {InputKoukaComponent} from "./input-kouka/input-kouka.component";
import {ImageInfoComponent} from "../image-info/image-info.component";
/**
 * Created by hp on 2017/02/25.
 */
export const KOUKA_ROUTES: Routes = [
  { path: 'listkouka',component:ListKoukaComponent},
  { path: 'inputkouka',component:InputKoukaComponent},
  { path: 'addimagekouka',component:ImageInfoComponent},
];
