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
  constructor(private af : AngularFire) {
    // this.busyoAddTrigger()
  }


  // //Firebaseのトリガー関連
  // busyoAddTrigger(){
  //   this.busyoAdd=Observable.create(observer=>{
  //     let commentsRef = firebase.database().ref('companyData/'+this.uid+'/BusyoInfo');
  //     commentsRef.on('child_added', function(data) {
  //       observer.next(data)
  //     });
  //   })
  // }


  getSyubetu(uid:string): FirebaseObjectObservable<any>{//すでに会社情報が登録されているかチェック
    return this.af.database.object('selectData/'+uid+'/syubetuInfo');

  }
}
