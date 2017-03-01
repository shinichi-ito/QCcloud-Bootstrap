import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class InsideMainService {

  constructor(private af : AngularFire) { }


  addSelect(uid: string,data:string) : Promise<any> {
    return new Promise((resolve, reject) => {
      let selectData = this.af.database.list('selectData/' + uid + '/syubetuInfo');
      let newRef = selectData.push(
        {
          syubetuInfo: data
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
  addTaisakuSelect(uid: string,data:string) : Promise<any> {
    return new Promise((resolve, reject) => {
      let selectData = this.af.database.list('selectData/' + uid + '/taisakuInfo');
      let newRef = selectData.push(
        {
          taisakuInfo: data
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
  addTaiouSelect(uid: string,data:string) : Promise<any> {
    return new Promise((resolve, reject) => {
      let selectData = this.af.database.list('selectData/' + uid + '/taiouInfo');
      let newRef = selectData.push(
        {
          taiouInfo: data
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
