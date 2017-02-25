
import {InputCommentComponent} from "./input-comment/input-comment.component";
import {ListCommentComponent} from "./list-comment/list-comment.component";
import {Routes} from "@angular/router";
/**
 * Created by hp on 2017/02/25.
 */
export const COMMENT_ROUTES: Routes = [
  { path: 'listcomment',component:ListCommentComponent},
  { path: 'inputcomment',component:InputCommentComponent}

];
