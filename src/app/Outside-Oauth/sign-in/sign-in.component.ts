import {Component, OnInit, ViewChild} from '@angular/core';
import {OauthService} from "../oauth.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {OauthInfoService} from "../../Inside-Oauth/oauth-info.service";
import {ErrorOutDialogComponent} from "../error-out-dialog/error-out-dialog.component";
import {ProgressOutDialogComponent} from "../progress-out-dialog/progress-out-dialog.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  myForm: FormGroup;
    @ViewChild("erroroutDialog") erroroutDialogComponent: ErrorOutDialogComponent;
   errorData:string;
   @ViewChild("progrssoutDialog") progressoutDialogComponent: ProgressOutDialogComponent;



  constructor(private oauthInfoService:OauthInfoService,private router: Router,private oauthService:OauthService,private fb: FormBuilder) {
    this.oauthService.flagChange$.subscribe((error)=>{
    //   console.log(error)
     this.progressoutDialogComponent.closeDialog();
      this.errorData=this.oauthService.errorChange(error);
      this.erroroutDialogComponent.openDialog()

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
   this.progressoutDialogComponent.openDialog();
    this.oauthService.signIn(this.myForm.value).then((authState)=>{
    //  console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
         this.oauthService.getUserInfo().subscribe((data)=>{//ユーザー情報を取得
          if(data){
        //     //OauthInfoServiceに共通データをいれて使いまわす
        //     //   console.log(data.auth.email)
            this.oauthInfoService.emailMain=data.auth.email;
          //  this.oauthInfoService.displayName=data.auth.displayName;
         //   this.oauthInfoService.photoURL=data.auth.photoURL;
           this.oauthInfoService.uid = authState.uid;
          }
         },error=>{//ユーザー情報失敗
           this.progressoutDialogComponent.closeDialog();
           this.errorData=error;
           this.erroroutDialogComponent.openDialog()
    });
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック

//console.log(data.$value)
            this.oauthInfoService.term=data.$value;//サインインのさいその時点のtermを保管して　プラン変更時に0なら会社情報はまだ　カード登録もまだ　1の場合は会社情報と　カード情報は登録済み　2は退会済み

            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある
              if(data.$value===1){
                console.log("クレームリストへ");
               // this.router.navigate(['/main/list'])
                this.router.navigate(['/main/topinside'])
                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
                //     this.insideService.addSitenSQLite()
                //     this.insideService.addBusyoSQLite()
                //     this.insideService.addMemberSQLite()
                ///////////////////////////データを前もって取得してSQLiteに登録///////////////////////////////
              }else if(data.$value===0){//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }else if(data.$value===2){//termが0であるから　期間をチェック
               // console.log('ここ')
                this.router.navigate(['/taikai'])
              }
           } else {
            console.log("No")//まだcompanyDataに登録がないので登録
            //signupで既に登録しているから　Noになることは考えられない
           }
          },
          (error)=>{//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック失敗
            //console.log('ここ2')
            this.progressoutDialogComponent.closeDialog();
             this.errorData=error;
             this.erroroutDialogComponent.openDialog()
            //   this.showError(this.oauthService.errorChange(error.message))
          })
      }
    }).catch((error)=>{
    // console.log('ここ')
      this.progressoutDialogComponent.closeDialog();
      this.errorData=error.message;
      this.erroroutDialogComponent.openDialog()
   //   this.showError(this.oauthService.errorChange(error.message))
    })
  }


  onSigninGoogle(){
   // firebase.database().goOnline();
    this.progressoutDialogComponent.openDialog();
    this.oauthService.loginGoogle().then((authState)=>{
   //   console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
        this.oauthService.getUserInfo().subscribe((data)=>{//ユーザー情報を取得
          if(data){
            //OauthInfoServiceに共通データをいれて使いまわす
         //  console.log(data.auth)
            this.oauthInfoService.emailMain=data.auth.email;
            this.oauthInfoService.displayName=data.auth.displayName;
            this.oauthInfoService.photoURL=data.auth.photoURL;
            this.oauthInfoService.uid = authState.uid;
          }
        });
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック
         //   console.log(data.$value)
          this.oauthInfoService.term=data.$value;//サインインのさいその時点のtermを保管して　プラン変更時に0なら会社情報はまだ　カード登録もまだ　1の場合は会社情報と　カード情報は登録済み　2は退会済み
            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある

              if(data.$value===1){
                console.log("クレームリストへ");
                 this.router.navigate(['/main/topinside'])
              }else if(data.$value===0){//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }else if(data.$value===2){//termが0であるから　期間をチェック
                this.router.navigate(['/taikai'])
              }
        } else {
              console.log("No")//まだcompanyDataに登録がないので登録
              this.oauthService.firstCompanyDataTwFaGo(authState.auth.displayName, authState.uid).then((data) => {
                //  this.startAtCheck(authState.uid)
              //  console.log('最初の会社情報登録成功2')
              //  console.log(data)
              //  console.log("クレームリストへ");
              //  this.oauthInfoService.OnOff=true;//これはmainじゃない時からmainに移るからオぶサーバ必要ない

                this.router.navigate(['/main/topinside'])
              })
            }
          },
          (error)=>{
            this.progressoutDialogComponent.closeDialog();
            this.errorData=error;
            this.erroroutDialogComponent.openDialog()


            //   this.showError(this.oauthService.errorChange(error.message))
          })
      }else{

        //  this.showError(this.oauthService.errorChange('ログインに失敗しました。再度ログインしてださい'))
      }
    }).catch(error=>{
      this.progressoutDialogComponent.closeDialog();
      this.errorData=error.message;
      this.erroroutDialogComponent.openDialog()
      //   this.showError(this.oauthService.errorChange(error.message))
    })
  }

  onSigninTwitter(){
    // firebase.database().goOnline();
    this.progressoutDialogComponent.openDialog();
    this.oauthService.loginTwitter().then((authState)=>{
      //   console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
        this.oauthService.getUserInfo().subscribe((data)=>{//ユーザー情報を取得
          if(data){
            //OauthInfoServiceに共通データをいれて使いまわす
            //  console.log(data.auth)
            this.oauthInfoService.emailMain=data.auth.email;
            this.oauthInfoService.displayName=data.auth.displayName;
            this.oauthInfoService.photoURL=data.auth.photoURL;
            this.oauthInfoService.uid = authState.uid;
          }
        });
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック
            //   console.log(data.$value)
            this.oauthInfoService.term=data.$value;//サインインのさいその時点のtermを保管して　プラン変更時に0なら会社情報はまだ　カード登録もまだ　1の場合は会社情報と　カード情報は登録済み　2は退会済み
            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある

              if(data.$value===1){
                console.log("クレームリストへ");
                this.router.navigate(['/main/topinside'])
              }else if(data.$value===0){//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }else if(data.$value===2){//termが0であるから　期間をチェック
                this.router.navigate(['/taikai'])
              }
            } else {
              console.log("No")//まだcompanyDataに登録がないので登録
              this.oauthService.firstCompanyDataTwFaGo(authState.auth.displayName, authState.uid).then((data) => {
                //  this.startAtCheck(authState.uid)
                //  console.log('最初の会社情報登録成功2')
                //  console.log(data)
                //  console.log("クレームリストへ");
                //  this.oauthInfoService.OnOff=true;//これはmainじゃない時からmainに移るからオぶサーバ必要ない

                this.router.navigate(['/main/topinside'])
              })
            }
          },
          (error)=>{
            this.progressoutDialogComponent.closeDialog();
            this.errorData=error;
            this.erroroutDialogComponent.openDialog()


            //   this.showError(this.oauthService.errorChange(error.message))
          })
      }else{

        //  this.showError(this.oauthService.errorChange('ログインに失敗しました。再度ログインしてださい'))
      }
    }).catch(error=>{
      this.progressoutDialogComponent.closeDialog();
      this.errorData=error.message;
      this.erroroutDialogComponent.openDialog()
      //   this.showError(this.oauthService.errorChange(error.message))
    })
  }

  onSigninFacebook(){
    // firebase.database().goOnline();
    this.progressoutDialogComponent.openDialog();
    this.oauthService.loginFacebook().then((authState)=>{
      //   console.log(authState.uid);
      if (authState && authState.uid) {//ログインした際にアカウントがしっかりとあるか
        this.oauthService.getUserInfo().subscribe((data)=>{//ユーザー情報を取得
          if(data){
            //OauthInfoServiceに共通データをいれて使いまわす
            //  console.log(data.auth)
            this.oauthInfoService.emailMain=data.auth.email;
            this.oauthInfoService.displayName=data.auth.displayName;
            this.oauthInfoService.photoURL=data.auth.photoURL;
            this.oauthInfoService.uid = authState.uid;
          }
        });
        this.oauthService.checkTerm(authState.uid).subscribe((data) => {//termを取得してデータがあるかチェックすることにより会社情報が登録済みかチェック
            //   console.log(data.$value)
            this.oauthInfoService.term=data.$value;//サインインのさいその時点のtermを保管して　プラン変更時に0なら会社情報はまだ　カード登録もまだ　1の場合は会社情報と　カード情報は登録済み　2は退会済み
            if (typeof data.$value=='number') {//data.$valueはterm
              console.log("Yes")//既にcompanyDataに登録がある

              if(data.$value===1){
                console.log("クレームリストへ");
                this.router.navigate(['/main/topinside'])
              }else if(data.$value===0){//termが0であるから　期間をチェック
                this.startAtCheck(authState.uid)
              }else if(data.$value===2){//termが0であるから　期間をチェック
                this.router.navigate(['/taikai'])
              }
            } else {
              console.log("No")//まだcompanyDataに登録がないので登録
              this.oauthService.firstCompanyDataTwFaGo(authState.auth.displayName, authState.uid).then((data) => {
                //  this.startAtCheck(authState.uid)
                //  console.log('最初の会社情報登録成功2')
                //  console.log(data)
                //  console.log("クレームリストへ");
                //  this.oauthInfoService.OnOff=true;//これはmainじゃない時からmainに移るからオぶサーバ必要ない

                this.router.navigate(['/main/topinside'])
              })
            }
          },
          (error)=>{
            this.progressoutDialogComponent.closeDialog();
            this.errorData=error;
            this.erroroutDialogComponent.openDialog()


            //   this.showError(this.oauthService.errorChange(error.message))
          })
      }else{

        //  this.showError(this.oauthService.errorChange('ログインに失敗しました。再度ログインしてださい'))
      }
    }).catch(error=>{
      this.progressoutDialogComponent.closeDialog();
      this.errorData=error.message;
      this.erroroutDialogComponent.openDialog()
      //   this.showError(this.oauthService.errorChange(error.message))
    })
  }
  startAtCheck(uid:string){//termが0である//0の時は　30日経過して正規の会社情報を登録してない状態
    this.oauthService.checkStartAt(uid).subscribe((data)=>{
      let startAt:number=this.oauthService.setTimeChange(data.$value);
      let date = new Date() ;
      let unixTimestampmill = date.getTime();// 現在のUNIX時間を取得する (ミリ秒単位)
      let unixTimestamp = this.oauthService.setTimeChange(unixTimestampmill);// 現在のUNIX時間を取得する (秒単位)
      //console.log(unixTimestamp)//現在秒
      // console.log(startAt)//登録時秒
      let term:number=unixTimestamp-startAt;
      //1分のタイムスタンプ絶対値（秒）＝60
      //1時間のタイムスタンプ絶対値（秒）＝3600
      //1日のタイムスタンプ絶対値（秒）＝86400
      //30日のタイムスタンプ絶対値（秒）＝2592000
      console.log(term)
      if (term >2) {//期日を超えたら　会社情報登録画面へ
        console.log("会社情報登録へ");
//this.oauthInfoService.OnOff=false;//これはmainじゃない時からmainに移るからオぶサーバ必要ない
       this.progressoutDialogComponent.closeDialog();
        this.router.navigate(['/main/companyInfo/addCompanyInfo'])
      }else{
        console.log("クレームリストへ");
        this.progressoutDialogComponent.closeDialog();
      //  this.oauthInfoService.OnOff=true;//これはmainじゃない時からmainに移るからオぶサーバ必要ない
        this.router.navigate(['/main/topinside'])


      //    this.router.navigate(['/main/companyInfo/addCompanyInfo'])
      }


    }),(error)=>{
      this.progressoutDialogComponent.closeDialog();
      this.errorData=error;
      this.erroroutDialogComponent.openDialog();
    };
  }







}
