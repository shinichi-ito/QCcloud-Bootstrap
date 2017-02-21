import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AngularFire} from "angularfire2";
import {OauthInfoService} from "../Inside-Oauth/oauth-info.service";
/**
 * Created by hp on 2017/02/21.
 */
@Injectable()
export class SignInGuard implements CanActivate {
  constructor(private oauthInfoService:OauthInfoService,private router: Router,private af : AngularFire) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.af.auth.map((auth) => {
      if (!auth) {
        this.router.navigate(['/signin']);
        return false;
      }else{
        if(typeof this.oauthInfoService.uid=== "undefined"){//これはログイン内の画面でリトライするとthis.oauthInfoService.uidのデータが消えるのでsibnin画面へ戻る
          this.router.navigate(['/signin'])
          return false;
        }else{
          console.log('ログイン確認済み')
          return true;
        }
     }

    }).take(1);
  }
}

