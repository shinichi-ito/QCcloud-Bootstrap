import { Injectable } from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import * as firebase from 'firebase'

@Injectable()
export class OauthInfoService {
public uid:string;
public displayName:string;
public photoURL:string;
public onoffHeader:boolean=false;
  public syubetu:any[]=[];

  companyname:string;
  daihyouname:string;
  address:string;
  tel:number;
  tantouname:string;
  email:string;
  employee:string;
  occupation:string;
  riyoukiyaku:boolean;
  privacypolicy:boolean;
  public busyoAdd: Observable<any>;
  constructor(private af : AngularFire) {}

}
