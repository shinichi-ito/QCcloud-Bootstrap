import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {InsideMainService} from "../inside-main.service";
import {OauthInfoService} from "../oauth-info.service";
import * as firebase from 'firebase'
import {Router} from "@angular/router";
@Component({
  selector: 'app-plan-change',
  templateUrl: './plan-change.component.html',
  styleUrls: ['./plan-change.component.css']
})
export class PlanChangeComponent implements OnInit {
uid:string;
  model;
  value: FirebaseObjectObservable<any>;
  term:number;
  OnOff:boolean;
  constructor(private router:Router,private af : AngularFire,private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
  this.term=this.oauthInfoService.term;
if(this.term===1){
  this.OnOff=true;
}else if(this.term===0){
  this.OnOff=false;

}
    this.model = {
      label: ""
    };

    this.uid=this.oauthInfoService.uid;
    this.insideMainService.getCompanyInfo(this.uid).subscribe((data)=>{
        for(let key in data){

          if(data[key].$key=='label'){
         //   console.log(data[key].$value)
            this.model.label=data[key].$value;
          }


        }//forを抜けた
      },
      (error)=>{

      })






  }
  sendCompanyInfo(){
    this.router.navigate(['/main/companyInfo/addCompanyInfo'])
  }
  ngOnInit() {
  }
  upCompanyInfo(){
    console.log(this.oauthInfoService.term)
    if(this.oauthInfoService.term===1){//サインインのさいその時点のtermを保管して　プラン変更時に0なら会社情報はまだ　カード登録もまだ　1の場合は会社情報と　カード情報は登録済み　2は退会済み
       const companyInfo = {
             label:this.model.label,
           planUp: firebase.database.ServerValue.TIMESTAMP,
         };
         this.value = this.af.database.object('companyData/' + this.uid + '/companyInfo');
         this.value.update(companyInfo).then(data=>{
           // console.log('会社詳細情報編集成功')
         }).catch(error=>{

       })

    }else  if(this.oauthInfoService.term===0){//0の場合まだ会社情報が登録されてないので　更にカード情報もされてないので会社情報の画面に偏移する

    }






  }
}
