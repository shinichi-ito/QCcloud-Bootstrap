import {Routes} from "@angular/router";
import {AddTaiouComponent} from "../add-taiou/add-taiou.component";
import {TopClaimEditComponent} from "./top-claim-edit/top-claim-edit.component";
import {AddCommentComponent} from "../add-comment/add-comment.component";
import {AddGeninComponent} from "../add-genin/add-genin.component";
import {AddTaisakuComponent} from "../add-taisaku/add-taisaku.component";
import {AddKoukaComponent} from "../add-kouka/add-kouka.component";
import {TAIOU_ROUTES} from "../add-taiou/taiou-routing";
import {COMMENT_ROUTES} from "../add-comment/comment-routing";
import {GENIN_ROUTES} from "../add-genin/genin-routing";
import {KOUKA_ROUTES} from "../add-kouka/kouka-routing";
import {TAISAKU_ROUTES} from "../add-taisaku/taisaku-routing";
import {EditClaimMainComponent} from "./edit-claim-main/edit-claim-main.component";
/**
 * Created by hp on 2017/02/25.
 */
export const CLAIM_ROUTES: Routes = [
  { path: 'editclaimmain',component:EditClaimMainComponent},
  { path: 'addtaiou',component:AddTaiouComponent,children: TAIOU_ROUTES},
  { path: 'addcomment',component:AddCommentComponent,children: COMMENT_ROUTES},
  { path: 'addgenin',component:AddGeninComponent,children: GENIN_ROUTES},
  { path: 'addtaisaku',component:AddTaisakuComponent,children: TAISAKU_ROUTES},
  { path: 'addkouka',component:AddKoukaComponent,children: KOUKA_ROUTES},



];
