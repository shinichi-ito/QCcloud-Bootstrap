import {ClaimListAllComponent} from "./claim-list-all/claim-list-all.component";
import {Routes} from "@angular/router";
import {TaisakuListAllComponent} from "./taisaku-list-all/taisaku-list-all.component";
import {TaiouListAllComponent} from "./taiou-list-all/taiou-list-all.component";
import {GeninListAllComponent} from "./genin-list-all/genin-list-all.component";
import {KoukaListAllComponent} from "./kouka-list-all/kouka-list-all.component";
import {ClaimListAllSyousaiComponent} from "./claim-list-all-syousai/claim-list-all-syousai.component";
import {FileListAllComponent} from "./file-list-all/file-list-all.component";
/**
 * Created by hp on 2017/02/28.
 */
export const CLAIMALL_ROUTES: Routes = [
  { path: 'claimlistall',component:ClaimListAllComponent},
  { path: 'claimlistallsyousai',component:ClaimListAllSyousaiComponent},
  { path: 'taisakulistall',component:TaisakuListAllComponent},
  { path: 'taioulistall',component:TaiouListAllComponent},
  { path: 'geninlistall',component:GeninListAllComponent},
  { path: 'koukalistall',component:KoukaListAllComponent},
  { path: 'filelistall',component:FileListAllComponent}

];
