import {Routes} from "@angular/router";
import {NewsLineComponent} from "./news-line/news-line.component";
import {CompanyEditComponent} from "./company-edit/company-edit.component";
import {CardEditCheckComponent} from "./card-edit-check/card-edit-check.component";
import {HenkinComponent} from "./henkin/henkin.component";
/**
 * Created by hp on 2017/03/17.
 */
export const ADMIN_ROUTES: Routes = [
  { path: 'newsline',component:NewsLineComponent},//admin/newsline
  { path: 'admincompanyedit',component:CompanyEditComponent},
  { path: 'cardeditcheck',component:CardEditCheckComponent},
  { path: 'henkin',component:HenkinComponent}
];
