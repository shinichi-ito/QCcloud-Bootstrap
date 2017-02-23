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

  public busyoAdd: Observable<any>;
  constructor(private af : AngularFire) {}

}
