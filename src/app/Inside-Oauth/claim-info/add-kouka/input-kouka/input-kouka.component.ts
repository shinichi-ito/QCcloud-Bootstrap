import {Component, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
import {InsideMainService} from "../../../inside-main.service";
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";
@Component({
  selector: 'app-input-kouka',
  templateUrl: './input-kouka.component.html',
  styleUrls: ['./input-kouka.component.css']
})
export class InputKoukaComponent  {
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  Data:string;


  name:string='';
  siten:string='';
  busyo:string='';
  mb:number;
  naiyou:string='';
  password:string='';
  Info: FirebaseObjectObservable<any[]>;
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;
  memberList:any[]=[];
  InfoData:any[]=[];
  uid:string;
  koukaInfo: FirebaseListObservable<any[]>;
  aa:number=5;
  bb:number=5;
  cc:number=5;
  dd:number=5;
  aanaiyou:string='';
  bbnaiyou:string='';
  ccnaiyou:string='';
  ddnaiyou:string='';
  taisakuList:any;
//key:string;
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  taisakuInfo: FirebaseObjectObservable<any[]>;
  claimList:any[]=[];
  koukaFromTaisakudata:any;
  OnOff:boolean=true;
  public constructor(private oauthInfoService:OauthInfoService,
                     private af : AngularFire,private insideService:InsideService,
                     private insideMainService:InsideMainService) {
    this.insideMainService.flagChangeError$.subscribe((error)=>{
      this.errorData=error;
      this.errorDialogComponent.openDialog();
    });

   this.koukaFromTaisakudata= this.insideMainService.koukaFromTaisakudata;
 //  console.log(this.koukaFromTaisakudata)
    this.claimitem=this.insideService.claimitem;



    this.uid=this.oauthInfoService.uid;
    this.memberList=this.insideService.memberList;
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }


  onAdd(){
    this.progressDialogComponent.openDialog();
    let time=this.dt.getTime();

    const Info = {
      seihin:this.claimitem.seihin,
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      kakuninbi:time,
      aa:this.aa,
      bb:this.bb,
      cc:this.cc,
      dd:this.dd,
      aanaiyou:this.aanaiyou,
      bbnaiyou:this.bbnaiyou,
      ccnaiyou:this.ccnaiyou,
      ddnaiyou:this.ddnaiyou,
      taisakukey:this.koukaFromTaisakudata.key,
      naiyou:this.naiyou,
      password:this.password,
      claimkey:this.claimitem.key,
      startAt: firebase.database.ServerValue.TIMESTAMP,
     updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.mb=this.insideMainService.getByteLength(JSON.stringify(Info));//アップするデータをメガバイトで取得
    this.koukaInfo=this.af.database.list('KoukaData/'+this.uid);
    this.koukaInfo.push(Info).then(data=>{
      this.addKoukaSu();
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,});
      this.insideService.InfoData=this.InfoData

    }).catch(error=>{
      this.progressDialogComponent.closeDialog();
      this.errorData=error.message;
      this.errorDialogComponent.openDialog()
    })
  }
  addKoukaSu(){//クレーム情報の対応数をプラス
    this.claimList=this.insideService.claimList;
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        const claimInfo = {
          kouka:this.claimList[key].kouka+1,
          koukaUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data=>{
         this.addTaisakusu()
        }).catch(error=>{
          this.progressDialogComponent.closeDialog();
          this.errorData=error.message;
          this.errorDialogComponent.openDialog()
        })

      }

    }

  }
  addTaisakusu(){//効果をインプットしたとき対策内のkoukasuに件数を入れる。あとでその対策で効果が入っているかチェックするため
  //  console.log(this.koukaFromTaisakudata.key)
    this.taisakuList=this.insideService.taisakuList;
    for(let key in this.taisakuList) {
   //   console.log(this.taisakuList[key].koukasu);
      if (this.taisakuList[key].key == this.koukaFromTaisakudata.key) {
        const Info = {
          koukasu:this.taisakuList[key].koukasu+1,
          updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.taisakuInfo=this.af.database.object('TaisakuData/'+this.uid+'/'+this.koukaFromTaisakudata.key);
        this.taisakuInfo.update(Info).then(data=>{
          this.OnOff=false;
          this.progressDialogComponent.closeDialog();
          this.insideMainService.onFileUpSuMain(this.uid,this.mb)//対応や対策のデータを登録時　その月のファイルアップロード数を加算する
        }).catch(error=>{
          this.progressDialogComponent.closeDialog();
          this.errorData=error.message;
          this.errorDialogComponent.openDialog()
        })

      }

    }

  }

  setMember(value){
    for(let key in this.memberList){
      if(this.memberList[key].key==value){
        //  console.log(this.name=this.memberList[key].name);
        this.name=this.memberList[key].name;
        this.siten=this.memberList[key].siten;
        this.busyo=this.memberList[key].busyo;
      }
    }

  }
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public open(): void {
    this.opened = !this.opened;
  }

}
