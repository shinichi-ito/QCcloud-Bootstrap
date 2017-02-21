import { Injectable } from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";

@Injectable()
export class OauthInfoService {
public uid:string;
public displayName:string;
public photoURL:string;
public onoffHeader:boolean=false;
  public syubetu:any[]=[];
  constructor(private af : AngularFire) { }
  getSyubetu(uid:string): FirebaseObjectObservable<any>{//すでに会社情報が登録されているかチェック
    return this.af.database.object('selectData/'+uid+'/syubetuInfo');

  }
}
