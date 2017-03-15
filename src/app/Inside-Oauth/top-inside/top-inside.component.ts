import { Component, OnInit } from '@angular/core';
import {InsideService} from "../Inside.service";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {OauthInfoService} from "../oauth-info.service";
import {InsideMainService} from "../inside-main.service";

@Component({
  selector: 'app-top-inside',
  templateUrl: './top-inside.component.html',
  styleUrls: ['./top-inside.component.css']
})
export class TopInsideComponent implements OnInit {
max:number=100;
  uid:string;
  label:string;
  check:boolean;
  login:number=0;
  dataup:number=0;
  fileup:number=0;
  loginGenkai:number;
  dataupGenkai:number;
  fileupGenkai:number;
  loginPa:number;
  loginPa1:number=50;
  dataupPa:number;
  fileupPa:number;
  companyDataList:any[]=[];
  constructor(private oauthInfoService:OauthInfoService,private af : AngularFire,private insideMainService:InsideMainService) {
    this.uid=this.oauthInfoService.uid;
    //console.log(this.uid)
    this.check=this.oauthInfoService.check;

    this.insideMainService.getCheckSu(this.uid).subscribe((data) => {//その月のログイン回数やファイルアップ数を取得
      //console.log(data)
for(let key in data){
        if(data[key].$key=='login'){
          this.login=data[key].$value
        }
}


    });
    this.insideMainService.getFileUpSu(this.uid).subscribe((data) => {//その月のログイン回数やファイルアップ数を取得
      //console.log(data)
      for (let key in data) {
        if (data[key].$key == 'fileup') {
          this.fileup = data[key].$value
        }
      }
    });
      this.insideMainService.getDataUpSu(this.uid).subscribe((data) => {//その月の画像アップ数を取得
        //console.log(data)
        for(let key in data){
          if(data[key].$key=='dataup'){
            this.dataup=data[key].$value
          }
        }

    });

    this.insideMainService.getCompanyInfo(this.uid).subscribe((data)=> {//これを使ってプランを取得する　ログイン回数とかファイルアップロード数を割り当てる
      for (let key in data) {
        if (data[key].$key == 'label') {
          this.label = data[key].$value;
        }
      }

      if (this.label == 'スタンダード') {
        this.companyDataList.push({login: 200, dataup: 200, fileup: 200})
      } else if (this.label == 'プレミアム') {
        this.companyDataList.push({login: 300, dataup: 300, fileup: 300})
      } else if (this.label == 'エキスパート') {
        this.companyDataList.push({login: 400, dataup: 400, fileup: 400})
      }

      if(this.login===0){//まだ一度もログインしてない状態

      }else{

      if (this.companyDataList[0].login > this.login) {//ログイン回数がプランの限度内に収まっている
       // console.log('収まっている')
        this.insideMainService.login = true;
      } else {//プランの限度内に収まっていない
       // console.log('収まっていない')
        this.insideMainService.login = false;

      }
    }
      if(this.dataup===0){//まだファイルが一件もアップしてない状態
//console.log('ないよ＾')
      }else{
      if (this.companyDataList[0].dataup > this.dataup) {//アップロード数がプランの限度内に収まっている
       // console.log('収まっている')
        this.insideMainService.dataup = true;
      } else {//プランの限度内に収まっていない
      //  console.log('収まっていない')
        this.insideMainService.dataup = false;

      }
    }


      if(this.fileup===0){//まだファイルが一件もアップしてない状態

      }else{
        if(this.companyDataList[0].fileup>this.fileup){//アップロード数がプランの限度内に収まっている
          //console.log('収まっている')
          this.insideMainService.fileup=true;
        }else{//プランの限度内に収まっていない
          console.log('収まっていない')
          this.insideMainService.fileup=false;

        }

      }
      this.loginGenkai=this.companyDataList[0].login;
      this.fileupGenkai=this.companyDataList[0].fileup;
      this.dataupGenkai=this.companyDataList[0].dataup;

this.loginPa=this.login/this.loginGenkai*100;
      this.fileupPa=this.fileup/this.fileupGenkai*100;
      this.dataupPa=this.dataup/this.dataupGenkai*100;
  //   this.insideMainService.companyDataList=this.companyDataList;
     // console.log(companyDataList[0].dataup)

    });


    if(this.oauthInfoService.newsList.length===0){

    }else{
      console.log(this.oauthInfoService.newsList[0].news)
    }

  }

  ngOnInit() {

  }
}
