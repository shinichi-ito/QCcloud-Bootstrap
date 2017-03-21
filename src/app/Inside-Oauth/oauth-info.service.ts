import { Injectable } from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import * as firebase from 'firebase'

@Injectable()
export class OauthInfoService {
  login:number=0;//その月のログイン回数を保管してある
 // dataup:number;//その月の関連ファイルのMBが入っている
 // fileup:number;//その月のデータアップのMBが入っている




public uid:string;
public displayName:string;
public photoURL:string;
public emailMain:string;//ここにメール入れて　shinichi-ito@lotsjoys.comを判定
//public onoffHeader:boolean=false;
  public syubetu:any[]=[];
check:boolean=false;//これは　claimalllistでログインの回数をカウントしている。その際これがtrueに変更になると一度ログインしてるので　カウントを増やさないようにしている
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
  newsList:any[]=[];
 // OnOff:boolean;//これは　インサイド内でのナビゲーションの二段目を表示するかどうか。　一覧　新規登録　投稿前とかのナビ
  // private _observer;
  // flagChange$: Observable<number>;
  constructor(private af : AngularFire) {
     // this.flagChange$ = new Observable(observer =>
     //  this._observer= observer).share();
    this.checkNewsTrigger()
  }

  checkNewsTrigger(){

    let commentsRef = firebase.database().ref('News/');
    commentsRef.on('child_added', (value)=> {
      //console.log(value.val())
      this.newsList.push({news:value.val()})
    })
  }

// setOnOff(){
//     this.OnOff=true;
// this._observer.next(this.OnOff)
//
//
// }


}
