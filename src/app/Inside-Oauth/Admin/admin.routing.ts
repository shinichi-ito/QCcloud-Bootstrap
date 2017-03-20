import {Routes} from "@angular/router";
import {NewsLineComponent} from "./news-line/news-line.component";
import {CompanyEditComponent} from "./company-edit/company-edit.component";
/**
 * Created by hp on 2017/03/17.
 */
export const ADMIN_ROUTES: Routes = [
  { path: 'newsline',component:NewsLineComponent},//admin/newsline
  { path: 'admincompanyedit',component:CompanyEditComponent}
];