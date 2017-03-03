import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class InsideMainService {
  jyoukyouData:any[]=[];//対応や対策の　対象のFileDataの一覧が入る
  jyoukyoukey:string;//これは画像を削除したとき削除した画像の対象のキー(データベース内の)


  constructor(private af : AngularFire) { }


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



}
