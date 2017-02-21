import {Injectable, Inject} from '@angular/core';
import {
  AngularFire, FirebaseAuthState, AuthProviders, AuthMethods, FirebaseObjectObservable,
  FirebaseApp
} from "angularfire2";
import {Observable} from "rxjs";
import {User} from "./User.interface";
import * as firebase from 'firebase'
import {OauthInfoService} from "../Inside-Oauth/oauth-info.service";
@Injectable()
export class OauthService {
  private auth: any;
  flagChange$: Observable<any>;
  private _observer;



  constructor(private af : AngularFire, @Inject(FirebaseApp) fa : any,private oauthInfoService:OauthInfoService) {
    this.flagChange$ = new Observable(observer =>//エラーをチェックしている
      this._observer = observer).share();
    this.auth = fa.auth();
  }
  createUser(user:User): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.createUser(
      {email: user.email, password: user.password}
    ).then(data=>{
      console.log('ユーザー登録成功!!')
      return data;
    }).catch(error=>{
      console.log('ユーザー作成時のエラー'+error.message);
      this._observer.next(error.message);

    })
  }
  signIn(user:User): firebase.Promise<FirebaseAuthState>{
    return this.af.auth.login(
      {email: user.email, password: user.password},
      {provider: AuthProviders.Password, method: AuthMethods.Password}
    ).then((authState) => {
      console.log("Successful OAuth-base Login");
      return authState;
    }).catch((error) => {
      //  console.log('サインイン時のエラー'+error.message);
      this._observer.next(error.message);


    });
  }
  firstCompanyData(user:User,uid: string) : Promise<any>{
    return new Promise((resolve, reject) => {
      let companyData = this.af.database.object('companyData/' + uid + '/companyInfo');
      //termが0の時は　30日経過して正規の会社情報を登録してない状態
      let newRef=companyData.set({companyname: user.companyname, term: 0, startAt: firebase.database.ServerValue.TIMESTAMP}).then((data)=>{

      }).catch((error)=>{
        console.log('最初の会社登録時のエラー'+error.message);
        this._observer.next(error.message);
      });

      if(newRef) {
        resolve(newRef);
      }
      else {
        reject("登録に失敗しました。時間をおいて再度登録ください");
      }

    })
  }

  firstCompanyDataTwFaGo(displayName:string,uid: string) : Promise<any>{
    return new Promise((resolve, reject) => {
      let companyData = this.af.database.object('companyData/' + uid + '/companyInfo');
      //termが0の時は　30日経過して正規の会社情報を登録してない状態
      let newRef=companyData.set({companyname: displayName, term: 0, startAt: firebase.database.ServerValue.TIMESTAMP}).then((data)=>{
       console.log('最初の会社情報登録成功')
       this.addSelect(uid)


      }).catch((error)=>{
        console.log('最初のTwitter,Facebook,Googleでの会社登録時の時のエラー'+error.message);
        this._observer.next(error.message);
      });
      if(newRef) {
        resolve(newRef);
      }
      else {
        reject("登録に失敗しました。時間をおいて再度登録ください");
      }

    })
  }
  addSelect(uid: string) : Promise<any>{
    return new Promise((resolve, reject) => {
      let selectData = this.af.database.object('selectData/' + uid);
      let newRef=selectData.set(
        {'syubetuInfo':['クレーム情報','社内不具合情報','顧客要望'],
          'taiouInfo':['対応前','初期対応中','経過観察中','再発生中','その他'],
          'taisakuInfo':['対策前','対策作成中','効果観察中','効果確認済','再発生中','その他']}).then((data)=>{
      }).catch((error)=>{
        this._observer.next(error.message);
      });
      if(newRef) {
        resolve(newRef);
      }
      else {
        reject("登録に失敗しました。時間をおいて再度登録ください");
      }
 })
  }

  getUserInfo():Observable<any>{//ログインとともに　ユーザー情報を取得
   return this.af.auth

  }


  loginTwitter(): firebase.Promise<FirebaseAuthState> {

    return this.af.auth.login(
      {
        provider: AuthProviders.Twitter,
        method: AuthMethods.Popup
      }
    ).then((authState) => {

      console.log("Successful OAuth-Twitter Login");
      // console.log(authState)
      return authState;
    }).catch((error) => {
      this._observer.next(error.message);
      console.log('TwitterLogin時のエラー'+error.message)
    });
  }

  loginFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login(
      {
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      }
    ).then((authState) => {
      console.log("Successful OAuth-Facebook Login");
      return authState;
    }).catch((error) => {
      this._observer.next(error.message);
      console.log('FacebookLogin時のエラー'+error.message)
    });
  }

  loginGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login(
      {
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }
    ).then((authState) => {
      console.log("Successful OAuth-Google-plus Login");
      return authState;
    }).catch((error) => {
      this._observer.next(error.message);
      console.log('GoogleLogin時のエラー'+error.message)
    });
  }











  checkStartAt(uid:string): FirebaseObjectObservable<any>{//すでに会社情報が登録されているかチェック
    return this.af.database.object('companyData/'+uid+'/companyInfo/startAt');

  }
  checkTerm(uid:string): FirebaseObjectObservable<any>{//すでに会社情報が登録されているかチェック
    return this.af.database.object('companyData/'+uid+'/companyInfo/term');

  }
  setTimeChange(unixTimestampmill:number){//(ミリ秒単位)から(秒単位)へ
    return Math.floor( unixTimestampmill / 1000 );
  }



  errorChange(message:string):string{//https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    if(message==='The email address is badly formatted.'){
      message='対象のメールアドレスの形式が間違っています';
    }else if(message==='The password is invalid or the user does not have a password.'){
      message='対象のパスワードが間違っています';
    }else if(message==='There is no user record corresponding to this identifier. The user may have been deleted.'){
      message='対象のユーザーが削除された可能性があります。アカウントを再度作成ください。';
    }else if(message==='The email address is already in use by another account.'){
      message='対象のメールアドレスは既に別のアカウントで使用されています。';
    }else if(message==="Cannot read property 'dismiss' of undefined"){
      message='ログインに失敗しました。　再ログインください。';
    }
    return message;
  }
  sendResetPasswordMail(email:string) {//パスワード再設定のメール送信
    this.auth .sendPasswordResetEmail(email)
      .then(resp =>{
        console.log('sent!')
        })
      .catch(error =>{
        this._observer.next(error.message);
      } );


  }

}