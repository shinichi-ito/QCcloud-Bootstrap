import {Component, ViewChild} from '@angular/core';
import {InsideService} from "../../Inside.service";
import {OauthInfoService} from "../../oauth-info.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import * as firebase from 'firebase'
import {InsideMainService} from "../../inside-main.service";
import {ClaimSelectComponent} from "../../Dialog/claim-select/claim-select.component";
import {ErrorDialogComponent} from "../../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../../Dialog/progress-dialog/progress-dialog.component";
import {SuccessDialogComponent} from "../../Dialog/success-dialog/success-dialog.component";
import {KanriNoDialogComponent} from "../../Dialog/kanri-no-dialog/kanri-no-dialog.component";

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent  {
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
   @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
   Data:string;
  @ViewChild("successDialog") successDialogComponent: SuccessDialogComponent;
  @ViewChild("selectClaimDialog") claimSelectComponent: ClaimSelectComponent;
  @ViewChild("kanrinoDialog") kanrinoComponent: KanriNoDialogComponent;
 // public mytime: Date = new Date();
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;
//  memberList:any[]=[];
  syubetus:any[]=[];
  syubetu:string;
  seihin:string;
  gaiyou:string;
  toukousyaData:any;
  name:string;
  siten:string;
  busyo:string;
 // branch:string;
  password:string;
  uid:string;
  koukai:number=0;
  moto:string='';
  basyo:string='';
  syousai:string='';
  seihininfo:string='';
//  yosoukoutei:string='';
  syubetuvalue:string='';
  model;
  claimInfo: FirebaseListObservable<any[]>;
  claimInfo2: FirebaseObjectObservable<any[]>;
  myForm: FormGroup;
  Info2: FirebaseObjectObservable<any[]>;
  check:boolean;
  login:number;

  busyoList:any[]=[];
  sitenList:any[]=[];
  memberList:any[]=[];
  syubetuList:any[]=[];
  taiouSyubetuList:any[]=[];
  taisakuSyubetuList:any[]=[];
  claimList:any[]=[];
  taiouList:any[]=[];
  geninList:any[]=[];
  koukaList:any[]=[];
  commentList:any[]=[];
  taisakuList:any[]=[];
  fileList:any[]=[];
  count:number;
  plusList:number;
  OnOff:boolean=true;
  OnOff2:boolean;
  mb:number;
  public constructor(private af : AngularFire,private insideService:InsideService,
                     private fb: FormBuilder,private oauthInfoService:OauthInfoService,
                      private insideMainService:InsideMainService) {

    this.insideMainService.flagChangeError$.subscribe((error)=>{
      this.errorData=error;
      this.errorDialogComponent.openDialog();
    });



    this.uid=this.oauthInfoService.uid;
   this.check=this.oauthInfoService.check;
    this.login=this.oauthInfoService.login;//その月のログイン回数が入ってくる
//    console.log(this.check);
    if(this.check){
//   //既に一度ログインしているのでこれ以上カウントを増やさない
      this.memberList=this.insideService.memberList;
      this.sitenList=this.insideService.sitenList;
      this.busyoList=this.insideService.busyoList;
      this.syubetuList=this.insideService.syubetuList;
      this.taiouSyubetuList=this.insideService.taiouSyubetuList;
      this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
    }else{

      //ここからログインした際に一気にデータを取得してそのサイズをその月のCheckにプラスしていく
      this.memberList=this.insideService.memberList;
      this.sitenList=this.insideService.sitenList;
      this.busyoList=this.insideService.busyoList;
      this.syubetuList=this.insideService.syubetuList;
      this.taiouSyubetuList=this.insideService.taiouSyubetuList;
      this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
      this.claimList=this.insideService.claimList;
      this.taiouList=this.insideService.taiouList;
      this.taisakuList=this.insideService.taisakuList;
      this.geninList=this.insideService.geninList;
      this.koukaList=this.insideService.koukaList;
      this.commentList=this.insideService.commentList;
      this.fileList=this.insideService.fileList;

      this.plusList=this.insideMainService.getByteLength(JSON.stringify(this.memberList.concat(this.sitenList)
        .concat(this.busyoList).concat(this.syubetuList).concat(this.taiouSyubetuList).concat(this.taisakuSyubetuList)
        .concat(this.claimList).concat(this.taiouList).concat(this.taisakuList).concat(this.geninList).concat(this.koukaList)
        .concat(this.commentList).concat(this.fileList)));

      this.onAddLogin(this.login+this.plusList,this.uid);//その月のログイン時(一覧表示　新規登録　公開前の画面に移ったらデータをすべて取得するからそれにプラスしてそのデータを上乗せする)
      this.oauthInfoService.check=true;//これをtrueにして　一度ログインしていることを示している
    }

    this.syubetus=this.syubetuList;
    this.model = {
      label: "kari"
    };
   // this.memberList=this.insideService.memberList;
    this.uid=this.oauthInfoService.uid;
    this.getKey();
    this.myForm = this.fb.group({
      "syubetu": ['',
        Validators.required
      ],
      "seihin": ['',Validators.compose([
          Validators.required
        ]
      )],
      "gaiyou": ['',
        Validators.required
      ],
      "toukousya": ['',Validators.compose([
          Validators.required
        ]
      )],
      "siten": [''],
      "busyo": [''],
      "syubetuvalue":[''],
      "password": ['',Validators.compose([
          Validators.required
        ]
      )]
    });

   (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
 }
  secondAdd(){
    this.progressDialogComponent.openDialog();
    const claimInfo = {
      syubetu:this.syubetu,
      seihin:this.seihin,
      gaiyou:this.gaiyou,
      siten:this.siten,
      busyo:this.busyo,
      password:this.password,
      moto:this.moto,
      basyo:this.basyo,
      hasseibi:this.dt,
    //  hasseiji:this.mytime,
      syousai:this.syousai,
      seihininfo:this.seihininfo,
    //  yosoukoutei:this.yosoukoutei,
      koukai:this.model.label
    };
    this.mb=this.insideMainService.getByteLength(JSON.stringify(claimInfo));//アップするデータをメガバイトで取得
    this.claimInfo2=this.af.database.object('ClaimData/'+this.uid+'/'+this.insideService.key);
    this.claimInfo2.update(claimInfo).then(data=>{
      this.insideMainService.onFileUpSuMain(this.uid,this.mb);//対応や対策のデータを登録時　その月のファイルアップロード数を加算する

      this.OnOff2=false;
      this.progressDialogComponent.closeDialog();
      this.successDialogComponent.openDialog();
    }).catch(error=>{
      this.progressDialogComponent.closeDialog();
      this.errorData=error.message;
      this.errorDialogComponent.openDialog()
    })
 }

  onAddLogin(count:number,uid:string){//これはログインした際その月のログイン回数に加算する
    const Info = {
      login:count
    };
    this.Info2=this.af.database.object('Check/'+uid+'/'+this.insideService.date2);
    this.Info2.set(Info).then(data=>{
      //   console.log(data.key)


    }).catch(error=>{

    })
  }





  getKey(){
    return this.insideService.key;
}


setMember(value){
//  console.log(this.toukousyaData);
  for(let key in this.memberList){
  //  console.log(this.memberList[key].key)
    if(this.memberList[key].key==value){
   // console.log(this.name=this.memberList[key].siten);
 //     console.log(this.name=this.memberList[key].busyo);
      this.name=this.memberList[key].name;
      this.siten=this.memberList[key].siten;
      this.busyo=this.memberList[key].busyo;
    }
  }

}
  onAdd(){
  this.progressDialogComponent.openDialog();
    const claimInfo = {
      syubetu:this.syubetu,
      seihin:this.seihin,
      gaiyou:this.gaiyou,
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      password:this.password,
      koukai:this.model.label,

      moto:'',
      basyo:'',
      hasseibi:'',
      syousai:'',
      seihininfo:'',
      taiou:0,
      taiouUp:'start',
      genin:0,
      geninUp:'start',
      taisaku:0,
      taisakuUp:'start',
      kouka:0,
      koukaUp:'start',
      comment:0,
      commentUp:'start',
      file:0,
      fileUp:'start',
      startAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.mb=this.insideMainService.getByteLength(JSON.stringify(claimInfo));//アップするデータをメガバイトで取得
    this.claimInfo=this.af.database.list('ClaimData/'+this.uid);
    this.claimInfo.push(claimInfo).then(data=>{
      this.insideMainService.onFileUpSuMain(this.uid,this.mb);//対応や対策のデータを登録時　その月のファイルアップロード数を加算する

     // console.log(data.key)
      this.insideService.key=data.key;
      this.OnOff=false;
      this.OnOff2=true;
this.progressDialogComponent.closeDialog();
this.kanrinoComponent.openDialog();
    }).catch(error=>{
      this.progressDialogComponent.closeDialog();
      this.errorData=error.message;
      this.errorDialogComponent.openDialog()
    })

  }


  addSyubetu(){
    this.claimSelectComponent.openDialog();

 }




//以下カレンダー関連のメソッド
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
  public open(): void {
    this.opened = !this.opened;
  }

}
