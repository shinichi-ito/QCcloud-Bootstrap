import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import * as firebase from 'firebase'
import {InsideService} from "./Inside.service";
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

  // flagChangeDelete$: Observable<number>;
  // private _observerdelete;

  flagChangeActive$: Observable<string>;
  private _observeractive;

  claimInfo: FirebaseObjectObservable<any[]>;
  info: FirebaseListObservable<any[]>;
  claimList:any[]=[];
  claimitem:any;
fileData:any[]=[];
timelineData:any;
  constructor(private insideService:InsideService,private af : AngularFire) {
    // this.flagChange$ = new Observable(observer =>
    //   this._observer = observer).share();
    // this.flagChangeDelete$ = new Observable(observer =>
    //   this._observerdelete = observer).share();

    this.flagChangeActive$ = new Observable((observer) =>{
      this._observeractive= observer
    }).share()

    this.claimitem=this.insideService.claimitem;
  }

  setActive(data){
    this.active=data;
    this._observeractive.next(this.active);
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
this.imageData=data;

  }).catch(error=>{
  })

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
          updateAt: firebase.database.ServerValue.TIMESTAMP
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



}
