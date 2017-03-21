import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import * as firebase from 'firebase'
import {InsideService} from "./Inside.service";
import {Router} from "@angular/router";
@Injectable()
export class InsideMainService {

  jyoukyouData:any[]=[];//対応や対策の　対象のFileDataの一覧が入る
  jyoukyoukey:string;//これは画像を削除したとき削除した画像の対象のキー(データベース内の)
  claimData:any;
taiouData:any[]=[];
taioukey:string;
  taisakuData:any[]=[];
  taisakukey:string;
  koukaData:any[]=[];
  koukakey:string;
  geninData:any[]=[];
  geninkey:string;
  commentData:any[]=[];
  commentkey:string;
  imageData:any;
  imageData2:any;
  active:any;
  koukaFromTaisakudata:any;
  value: FirebaseObjectObservable<any>;
  // flagChange$: Observable<number>;
  // private _observer;
  Info2: FirebaseObjectObservable<any[]>;
  // flagChangeDelete$: Observable<number>;
  // private _observerdelete;
  companyDataList:any[]=[];
  flagChangeActive$: Observable<string>;
  private _observeractive;

  claimInfo: FirebaseObjectObservable<any[]>;
  info: FirebaseListObservable<any[]>;
  claimList:any[]=[];
  claimitem:any;
fileData:any[]=[];
timelineData:any;
//companyDataList:any[]=[];//これは　プランの情報が入っている　ログイン回数　ファイルアップロード数の限度数
  date:Date = new Date();
  date2:any;
error:any;


  login:boolean=true;//topinsideでぷらんの範囲内かチェックするOKはtrue,Ngはfalse
  dataup:boolean=true;
  fileup:boolean=true;




  flagChangeError$: Observable<number>;
  private _observerError;
  constructor(private router: Router,private insideService:InsideService,private af : AngularFire) {
    this.date2=this.date.toISOString().split('-')[0]+'-'+this.date.toISOString().split('-')[1];
    this.flagChangeError$ = new Observable(observer =>
      this._observerError = observer).share();

    this.flagChangeActive$ = new Observable((observer) =>{
      this._observeractive= observer
    }).share()

    this.claimitem=this.insideService.claimitem;
  }


setError(error){

    this.error=error;
this._observerError.next(this.error);

}
logout(){
  firebase.database().goOffline();//なんかパーミッションのエラーがでたので http://stackoverflow.com/questions/40105221/angularfire2-read-data-once
  //を参考にした　この中に　サインインのさいgoOnlineと書いてあるが　それを設定するとエラーになるので行ってない
  this.af.auth.logout();
  this.router.navigate(['/landing'])

}




  //////////////////////////////////////////////////////////////////

checkDataUp(){//プランの限度額と現在の関連ファイルのバイト数を比較
  let dataupList=this.insideService.dataupList;//dataupListには変更時トリガーされているので最新情報が入っている 画面偏移時チェックする
if(this.companyDataList[0].dataup> dataupList[0].count){
  return false;
}else{
  return true;
}
}

  checkFileUp() {//プランの限度額と現在のデータのバイト数を比較
    let fileupList = this.insideService.fileupList;//fileupListには変更時トリガーされているので最新情報が入っている　画面偏移時チェックする
    if (this.companyDataList[0].fileup > fileupList[0].count) {
      return false;
    } else {
      return true;
    }
  }

//////////////////////////////////////////////////////////////////////


  onFileUpSuMain(uid,mb){//対応や対策のデータを登録時　その月のファイルアップロード数を加算する
    let fileupList=this.insideService.fileupList;

    if(fileupList.length==0){//まだ　登録がされてないケース月初めとか
      //   console.log('ない')
      this.onFileupSuAdd(mb,uid)
    }else{
      // console.log(fileupList[0].count)
   //   console.log(mb)
      this.onFileupSuAdd(fileupList[0].count+mb,uid)
    }

  }

  onFileupSuAdd(count:number,uid:string){//これはログインした際その月のログイン回数を数える
    const Info = {
      fileup:count
    };
    this.Info2=this.af.database.object('FileUpCheck/'+uid+'/'+this.insideService.date2);
    this.Info2.set(Info).then(data=>{
      //   console.log(data.key)


    }).catch(error=>{

    })
  }

  onDataUpSuMain(uid,size){//対応や対策のデータを登録時　その月のファイルアップロード数を加算する
    let sizeMB:number;
    sizeMB=size/1024/1024;
    let dataupList=this.insideService.dataupList;

    if(dataupList.length==0){//まだ　登録がされてないケース月初めとか
      //   console.log('ない')
      this.onDataupSuAdd(sizeMB,uid)
    }else{
      //  console.log('ある')
      this.onDataupSuAdd(dataupList[0].count+sizeMB,uid)
    }

  }
  onDataupSuAdd(count:number,uid:string){//これはログインした際その月のログイン回数を数える
    const Info = {
      dataup:count
    };
    this.Info2=this.af.database.object('DataUpCheck/'+uid+'/'+this.insideService.date2);
    this.Info2.set(Info).then(data=>{


    }).catch(error=>{

    })
  }




  setActive(data){
    this.active=data;
    this._observeractive.next(this.active);
  }


  getCheckSu(uid:string): FirebaseListObservable<any> {//その月のログイン回数やファイルアップ数を取得

    return this.af.database.list('/Check/' + uid + '/'+this.date2);
  }
  getFileUpSu(uid:string): FirebaseListObservable<any> {//その月のログイン回数やファイルアップ数を取得

    return this.af.database.list('/FileUpCheck/' + uid + '/'+this.date2);
  }
  getDataUpSu(uid:string): FirebaseListObservable<any> {//その月のログイン回数やファイルアップ数を取得

    return this.af.database.list('/DataUpCheck/' + uid + '/'+this.date2);
  }
fileDataUp(toukousya:string,siten:string,busyo:string,comment:string,uid:string,key:string){
  const Info = {
    toukousya:toukousya,
    siten:siten,
    busyo:busyo,
    comment:comment,
    updateAt: firebase.database.ServerValue.TIMESTAMP,
  };
  this.value = this.af.database.object('FileData/' + uid + '/'+key);
  this.value.update(Info).then(data=>{
   // this._observer.next(this.imageData);
this.editImageTime(uid)

  }).catch(error=>{
  })

}
  editImageTime(uid:string){//クレーム情報の対応数をマイナス
    this.claimitem=this.insideService.claimitem;
    this.claimList=this.insideService.claimList;
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {

        const claimInfo = {
          fileUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+uid+'/'+this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data=>{
          //    this._observerdelete.next(this.imageData2);
          //this.imageData2=data;
          this.imageData=data;
        }).catch(error=>{
        })
      }
    }
  }

  fileDelete(key:string,uid:string){
    this.info=this.af.database.list('FileData/'+uid);
    this.info.remove(key)
      .then(data=>{

     this.minusImageSu(uid)
      })
      .catch(error=>{


      });
  }

  minusImageSu(uid:string){//クレーム情報の対応数をマイナス
    this.claimitem=this.insideService.claimitem;
    this.claimList=this.insideService.claimList;
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        let su:number;
        su=this.claimList[key].file-1;
        if(su<0){
          su=0;
        }
         const claimInfo = {
           file:su,
          fileUp: firebase.database.ServerValue.TIMESTAMP
        };
         this.claimInfo=this.af.database.object('ClaimData/'+uid+'/'+this.claimitem.key);
         this.claimInfo.update(claimInfo).then(data=>{
       //    this._observerdelete.next(this.imageData2);
           this.imageData2=data;

         }).catch(error=>{
         })
      }
    }
  }




  addSelect(uid: string,data:string,tourokusya:string) : Promise<any> {
    return new Promise((resolve, reject) => {
      let selectData = this.af.database.list('selectData/' + uid + '/syubetuInfo');
      let newRef = selectData.push(
        {
          syubetuInfo: data,
          tourokusya:tourokusya
        }).then((data) => {

      }).catch((error) => {

      });
      if (newRef) {
        resolve(newRef);
      }
      else {
        reject("登録に失敗しました。時間をおいて再度登録ください");
      }
    })
  }
  addTaisakuSelect(uid: string,data:string,tourokusya:string) : Promise<any> {
    return new Promise((resolve, reject) => {
      let selectData = this.af.database.list('selectData/' + uid + '/taisakuInfo');
      let newRef = selectData.push(
        {
          taisakuInfo: data,
          tourokusya:tourokusya
        }).then((data) => {

      }).catch((error) => {

      });
      if (newRef) {
        resolve(newRef);
      }
      else {
        reject("登録に失敗しました。時間をおいて再度登録ください");
      }
    })
  }
  addTaiouSelect(uid: string,data:string,tourokusya:string) : Promise<any> {
  // console.log('ここ')
    return new Promise((resolve, reject) => {
      let selectData = this.af.database.list('selectData/' + uid + '/taiouInfo');
      let newRef = selectData.push(
        {
          taiouInfo: data,
          tourokusya:tourokusya
        }).then((data) => {

      }).catch((error) => {

      });
      if (newRef) {
        resolve(newRef);
      }
      else {
        reject("登録に失敗しました。時間をおいて再度登録ください");
      }
    })
  }

  getCompanyInfo(uid:string): FirebaseListObservable<any> {//すでに会社情報が登録されているかチェック

    return this.af.database.list('/companyData/' + uid + '/companyInfo');
  }
  editCompanyDetail(companyname,daihyouname,address,tel,tantouname,email,employee,occupation,uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const companyInfo = {
        companyname:companyname,
        daihyouname:daihyouname,
        address:address,
        tel:tel,
        tantouname:tantouname,
        email:email,
        employee:employee,
        occupation:occupation,
        updateAt: firebase.database.ServerValue.TIMESTAMP,
      };
      let companyData = this.af.database.object('companyData/' + uid + '/companyInfo');
      let newRef=companyData.update(companyInfo).then((data)=>{
        console.log('会社詳細情報編集成功')
      }).catch((error)=>{


      });
      if(newRef) {
        resolve(newRef);
      }
      else {
        reject("登録に失敗しました。時間をおいて再度登録ください");
      }

    })
  }

  getByteLength(str){//取得した文字をMBに変換
    // console.log( this.getByteLength(JSON.stringify(this.newclaimList)))
    str = (str==null)?"":str;
    return encodeURI(str).replace(/%../g, "*").length/1024/1024;
  }
  download(data){//CSVをダウンロード
    var csvData = this.ConvertToCSV(data);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'SampleExport.csv';
    a.click();
  }


  ConvertToCSV(objArray) {//JSONをCSVに変換
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += '"'+array[i][index]+'"';//ダブル点追加
      }
      str += line + '\r\n';
    }
    return str;
  }


}
