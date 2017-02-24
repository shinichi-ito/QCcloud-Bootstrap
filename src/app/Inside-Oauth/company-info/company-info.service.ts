import { Injectable } from '@angular/core';
import {CompanyDetail} from "./CompanyDetail";
import * as firebase from 'firebase'
import {AngularFire, FirebaseObjectObservable} from "angularfire2";

@Injectable()
export class CompanyInfoService {
  Info: FirebaseObjectObservable<any[]>;
  constructor(private af : AngularFire) {

  }

  addCompanyDetail(companydetail:CompanyDetail,uid: string){
      const companyInfo = {
        companyname:companydetail.companyname,
        daihyouname:companydetail.daihyouname,
        address:companydetail.address,
        tel:companydetail.tel,
        tantouname:companydetail.tantouname,
        email:companydetail.email,
        employee:companydetail.employee,
        occupation:companydetail.occupation,
        riyoukiyaku:companydetail.riyoukiyaku,
        privacypolicy:companydetail.privacypolicy,
        updateAt: firebase.database.ServerValue.TIMESTAMP,
        term:1//1の時は　30日経過して正規の会社情報を登録した
      };
      this.Info = this.af.database.object('companyData/' + uid + '/companyInfo');
     return this.Info.update(companyInfo)


  }

  editCompanyDetail(companyname,daihyouname,address,tel,tantouname,email,url,employee,occupation,uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const companyInfo = {
        companyname:companyname,
        daihyouname:daihyouname,
        address:address,
        tel:tel,
        tantouname:tantouname,
        email:email,
        url:url,
        employee:employee,
        occupation:occupation,
        updateAt: firebase.database.ServerValue.TIMESTAMP,
      };
      let companyData = this.af.database.object('companyData/' + uid + '/companyInfo');
      let newRef=companyData.update(companyInfo).then((data)=>{
        console.log('会社詳細情報編集成功')
      }).catch((error)=>{
      //  this._observer.next(error.message);

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
