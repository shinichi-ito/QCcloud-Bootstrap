
import {AddMember2Component} from "./add-member2/add-member2.component";
import {Routes} from "@angular/router";
import {Soft2InfoComponent} from "./soft2-info/soft2-info.component";
import {Claim2AddComponent} from "./claim2-add/claim2-add.component";
import {Taiou2AddComponent} from "./taiou2-add/taiou2-add.component";
import {Kouka2AddComponent} from "./kouka2-add/kouka2-add.component";
import {Search2Component} from "./search2/search2.component";
import {Image2AddComponent} from "./image2-add/image2-add.component";
import {Time2LineComponent} from "./time2-line/time2-line.component";
/**
 * Created by hp on 2017/04/14.
 */
export const USAGE2_ROUTES: Routes = [

  { path: 'addmember2',component: AddMember2Component },
  { path: 'softinfo2',component:Soft2InfoComponent},
  { path: 'usageclaimadd2',component:Claim2AddComponent},
  { path: 'usagetaiouadd2',component:Taiou2AddComponent},
  { path: 'usagekoukaadd2',component:Kouka2AddComponent},
  { path: 'usagesearch2',component:Search2Component},
  { path: 'usageimage2',component:Image2AddComponent},
  { path: 'usagetimeline2',component:Time2LineComponent},
];
