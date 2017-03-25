import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {OauthInfoService} from "../oauth-info.service";
import {InsideMainService} from "../inside-main.service";
import {ErrorDialogComponent} from "../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../Dialog/progress-dialog/progress-dialog.component";

@Component({
  selector: 'app-top-inside',
  templateUrl: './top-inside.component.html',
  styleUrls: ['./top-inside.component.css']
})
export class TopInsideComponent implements OnInit {

  uid:string;
  label:string;
 // check:boolean;
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
 // Info2: FirebaseObjectObservable<any[]>;
loginCheck:boolean;
fileupCheck:boolean;
dataupCheck:boolean;
  newsList:any[]=[];
  email:string;
  photoURL:string;
  OnOff:boolean;

   @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
   errorData:string;
   @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
   Data:string;

  constructor(private oauthInfoService:OauthInfoService,private af : AngularFire,
              private insideMainService:InsideMainService){
    this.getNews().subscribe(data=>{
      this.newsList=data;
     this.email= this.oauthInfoService.emailMain;
     this.photoURL= this.oauthInfoService.photoURL;
     if(this.photoURL==''){
       this.OnOff=false;
     }else{
       this.OnOff=true;
     }
    },error=>{
      this.errorData='取得に失敗しました。再ログインしてください。';
      this.errorDialogComponent.openDialog();
    });
   this.uid=this.oauthInfoService.uid;

  this.insideMainService.getCheckSu(this.uid).subscribe((data) => {//その月のログイン回数やファイルアップ数を取得
      for(let key in data){
        if(data[key].$key=='login'){
          this.login=data[key].$value;//その月のログインした際の取得データ数
        }
    }
    this.oauthInfoService.login=this.login
   },error=>{
    this.errorData='取得に失敗しました。再ログインしてください。';
    this.errorDialogComponent.openDialog();


  });

    this.insideMainService.getFileUpSu(this.uid).subscribe((data) => {//その月のファイルアップのメガバイト取得
      //console.log(data)
      for (let key in data) {
        if (data[key].$key == 'fileup') {
          this.fileup = data[key].$value
        //  this.oauthInfoService.fileup=this.fileup;
        }
      }
    },error=>{
      this.errorData='取得に失敗しました。再ログインしてください。';
      this.errorDialogComponent.openDialog();

    });
      this.insideMainService.getDataUpSu(this.uid).subscribe((data) => {//その月の画像アップのメガバイトを取得
        //console.log(data)
        for(let key in data){
          if(data[key].$key=='dataup'){
            this.dataup=data[key].$value
          //  this.oauthInfoService.dataup=this.dataup;
          }
        }

    },error=>{
        this.errorData='取得に失敗しました。再ログインしてください。';
        this.errorDialogComponent.openDialog();
      });

    this.insideMainService.getCompanyInfo(this.uid).subscribe((data)=> {//これを使ってプランを取得する　ログイン回数とかファイルアップロード数を割り当てる
      for (let key in data) {
        if (data[key].$key == 'label') {
          this.label = data[key].$value;
        }
      }

      if (this.label == 'スタンダード') {
        this.companyDataList.push({login: 60, dataup: 300, fileup: 50})//月に1GB＝1024MBアップできる
      } else if (this.label == 'プレミアム') {
        this.companyDataList.push({login: 110, dataup: 600, fileup: 90})
      } else if (this.label == 'エキスパート') {
        this.companyDataList.push({login: 160, dataup: 900, fileup: 130})
      }
this.insideMainService.companyDataList=this.companyDataList;
      if(this.login===0){//まだ一度もログインしてない状態
//console.log('ここ')
        this.loginCheck=true;
      }else{

      if (this.companyDataList[0].login > this.login) {//ログイン回数がプランの限度内に収まっている
      //  console.log('収まっている')

        this.loginCheck=true;
        this.insideMainService.login = true;
      } else {//プランの限度内に収まっていない
       // console.log('収まっていない')
        this.loginCheck=false;
        this.insideMainService.login = false;

      }
    }
      if(this.dataup===0){//まだファイルが一件もアップしてない状態
//console.log('ないよ＾')


      }else{
      if (this.companyDataList[0].dataup > this.dataup) {//アップロード数がプランの限度内に収まっている
       // console.log('収まっている')
        this.dataupCheck=true;
        this.insideMainService.dataup = true;
      } else {//プランの限度内に収まっていない
      //  console.log('収まっていない')
        this.dataupCheck=false;
        this.insideMainService.dataup = false;

      }
    }


      if(this.fileup===0){//まだファイルが一件もアップしてない状態

      }else{
        if(this.companyDataList[0].fileup>this.fileup){//アップロード数がプランの限度内に収まっている
          //console.log('収まっている')
          this.fileupCheck=true;
          this.insideMainService.fileup=true;
        }else{//プランの限度内に収まっていない
          //console.log('収まっていない')
          this.fileupCheck=false;
          this.insideMainService.fileup=false;

        }

      }
     this.loginGenkai=this.companyDataList[0].login;
      this.fileupGenkai=this.companyDataList[0].fileup;
      this.dataupGenkai=this.companyDataList[0].dataup;

this.loginPa=Math.ceil(this.login/this.loginGenkai*100);
      this.fileupPa=Math.ceil(this.fileup/this.fileupGenkai*100);
      this.dataupPa=Math.ceil(this.dataup/this.dataupGenkai*100);
  //   this.insideMainService.companyDataList=this.companyDataList;
     // console.log(companyDataList[0].dataup)

    },error=>{
      this.errorData='取得に失敗しました。再ログインしてください。';
      this.errorDialogComponent.openDialog();


    });



    // if(this.oauthInfoService.newsList.length===0){
    //
    // }else{
    // //  console.log(this.oauthInfoService.newsList[0].news)
    // }

  }

  ngOnInit() {

  }
  getNews(): FirebaseListObservable<any> {//お知らせを取得

    return this.af.database.list('/News');
  }

}
