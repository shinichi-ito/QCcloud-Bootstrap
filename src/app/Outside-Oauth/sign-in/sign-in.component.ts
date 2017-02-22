import { Component, OnInit } from '@angular/core';
import {OauthService} from "../oauth.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {OauthInfoService} from "../../Inside-Oauth/oauth-info.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  myForm: FormGroup;
  constructor(private oauthInfoService:OauthInfoService,private router: Router,private oauthService:OauthService,private fb: FormBuilder) {
    this.oauthService.flagChange$.subscribe((error)=>{
       console.log(this.oauthService.errorChange(error))
     })

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      "email": ['',Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9.\-]+@[A-Za-z0-9\-]+[.][A-Za-z0-9.\-]+')]
      )],
      "password": ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
    });


  }

  onSendResetPasswordMail(){//パスワード再設定のメール送信
    this.oauthService.sendResetPasswordMail(this.myForm.value.email);
  }


  changeCreateUserPage(){
      this.router.navigate(['/signup'])
  }
changeTop(){
  this.router.navigate(['/top'])
}


  signIn(){
 //   this.showLoading();
    this.oauthService.signIn(this.myForm.value).then((authState)=>{
      console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
       this.oauthInfoService.uid = authState.uid;//inside.serviceのuidにデータを入れて　main.componentの初期化時これをもとにデータを引っ張り出す。　または　会社情報登録ページにてuidあるかチェックする。
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック
            console.log(data.$value)
            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある
              if(data.$value===1){
                console.log("クレームリストへ");
                this.router.navigate(['/main/list'])

                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
                //     this.insideService.addSitenSQLite()
                //     this.insideService.addBusyoSQLite()
                //     this.insideService.addMemberSQLite()
                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
              }else{//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }
            } else {
              console.log("No")//まだcompanyDataに登録がないので登録
            //signupで既に登録しているから　Noになることは考えられない
            }
          },
          (error)=>{
            //   this.showError(this.oauthService.errorChange(error.message))
          }),(error)=>{

        }
      }
    }).catch((error)=>{
   //   this.showError(this.oauthService.errorChange(error.message))
    })
  }

  onSigninTwitter(){
    this.oauthService.loginTwitter().then((authState)=>{
      console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
        this.oauthService.getUserInfo().subscribe((data)=>{//ユーザー情報を取得
          if(data){
            //OauthInfoServiceに共通データをいれて使いまわす
            this.oauthInfoService.displayName=data.auth.displayName;
            this.oauthInfoService.photoURL=data.auth.photoURL;
            this.oauthInfoService.uid = authState.uid;
        }
        }),(error)=>{

        };
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック
            console.log(data.$value)
            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある
              if(data.$value===1){
                console.log("クレームリストへ");
                this.router.navigate(['/main/list'])

                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
           //     this.insideService.addSitenSQLite()
           //     this.insideService.addBusyoSQLite()
           //     this.insideService.addMemberSQLite()
             ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
              }else{//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }
            } else {
              console.log("No")//まだcompanyDataに登録がないので登録
              this.oauthService.firstCompanyDataTwFaGo(authState.auth.displayName, authState.uid).then((data) => {
                //  this.startAtCheck(authState.uid)
                console.log('最初の会社情報登録成功2')
                 console.log(data)
                console.log("クレームリストへ");
                this.router.navigate(['/main/list'])
              })
            }
          },
          (error)=>{
         //   this.showError(this.oauthService.errorChange(error.message))
          }),(error)=>{

        }
      }else{
      //  this.showError(this.oauthService.errorChange('ログインに失敗しました。再度ログインしてださい'))
      }
    }).catch(error=>{
   //   this.showError(this.oauthService.errorChange(error.message))
    })
  }
  onSigninGoogle(){
    this.oauthService.loginGoogle().then((authState)=>{
      console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
        this.oauthService.getUserInfo().subscribe((data)=>{//ユーザー情報を取得
          if(data){
            //OauthInfoServiceに共通データをいれて使いまわす
            this.oauthInfoService.displayName=data.auth.displayName;
            this.oauthInfoService.photoURL=data.auth.photoURL;
            this.oauthInfoService.uid = authState.uid;
          }
        })
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック
            console.log(data.$value)
            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある
              if(data.$value===1){
                console.log("クレームリストへ");
                this.router.navigate(['/main/list'])

                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
                //     this.insideService.addSitenSQLite()
                //     this.insideService.addBusyoSQLite()
                //     this.insideService.addMemberSQLite()
                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
              }else{//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }
            } else {
              console.log("No")//まだcompanyDataに登録がないので登録
              this.oauthService.firstCompanyDataTwFaGo(authState.auth.displayName, authState.uid).then((data) => {
                //  this.startAtCheck(authState.uid)
                console.log('最初の会社情報登録成功2')
                console.log(data)
                console.log("クレームリストへ");
                this.router.navigate(['/main/list'])
              })
            }
          },
          (error)=>{
            //   this.showError(this.oauthService.errorChange(error.message))
          }),(error)=>{

        }
      }else{
        //  this.showError(this.oauthService.errorChange('ログインに失敗しました。再度ログインしてださい'))
      }
    }).catch(error=>{
      //   this.showError(this.oauthService.errorChange(error.message))
    })
  }
  onSigninFacebook(){
    this.oauthService.loginFacebook().then((authState)=>{
      console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
        this.oauthService.getUserInfo().subscribe((data)=>{//ユーザー情報を取得
          if(data){
            //OauthInfoServiceに共通データをいれて使いまわす
            this.oauthInfoService.displayName=data.auth.displayName;
            this.oauthInfoService.photoURL=data.auth.photoURL;
            this.oauthInfoService.uid = authState.uid;
          }
        }),(error)=>{

        }
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック
            console.log(data.$value)
            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある
              if(data.$value===1){
                console.log("クレームリストへ");
                this.router.navigate(['/main/list'])

                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
                //     this.insideService.addSitenSQLite()
                //     this.insideService.addBusyoSQLite()
                //     this.insideService.addMemberSQLite()
                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
              }else{//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }
            } else {
              console.log("No")//まだcompanyDataに登録がないので登録
              this.oauthService.firstCompanyDataTwFaGo(authState.auth.displayName, authState.uid).then((data) => {
                //  this.startAtCheck(authState.uid)
                console.log('最初の会社情報登録成功2')
                console.log(data)
                console.log("クレームリストへ");
                this.getSyubetu(authState.uid)
                this.router.navigate(['/main/list'])
              })
            }
          },
          (error)=>{
            //   this.showError(this.oauthService.errorChange(error.message))
          }),(error)=>{

        }
      }else{
        //  this.showError(this.oauthService.errorChange('ログインに失敗しました。再度ログインしてださい'))
      }
    }).catch(error=>{
      //   this.showError(this.oauthService.errorChange(error.message))
    })
  }
  startAtCheck(uid:string){//termが0である//0の時は　30日経過して正規の会社情報を登録してない状態
    this.oauthService.checkStartAt(uid).subscribe((data)=>{
      let startAt:number=this.oauthService.setTimeChange(data.$value)
      let date = new Date() ;
      let unixTimestampmill = date.getTime();// 現在のUNIX時間を取得する (ミリ秒単位)
      let unixTimestamp = this.oauthService.setTimeChange(unixTimestampmill)// 現在のUNIX時間を取得する (秒単位)
      //console.log(unixTimestamp)//現在秒
      // console.log(startAt)//登録時秒
      let term:number=unixTimestamp-startAt;
      //1分のタイムスタンプ絶対値（秒）＝60
      //1時間のタイムスタンプ絶対値（秒）＝3600
      //1日のタイムスタンプ絶対値（秒）＝86400
      //30日のタイムスタンプ絶対値（秒）＝2592000
      console.log(term)
      if (term >2592000) {//期日を超えたら　会社情報登録画面へ
        console.log("会社情報登録へ");

        this.router.navigate(['/main/companyInfo/addCompanyInfo'])
      }else{
        console.log("クレームリストへ");
        ///////////////////前もってデータを取得しておく//////////////////////////
        this.getSyubetu(uid)
        ///////////////////前もってデータを取得しておく//////////////////////////

        this.router.navigate(['/main/addemployee'])
      }


    }),(error)=>{

    };
  }

  getSyubetu(uid:string){
    this.oauthInfoService.getSyubetu(uid).subscribe(data=>{
      for(let key in data){
      //  console.log(data[key])
        this.oauthInfoService.syubetu.push(data[key])
      }



    })


  }





}
