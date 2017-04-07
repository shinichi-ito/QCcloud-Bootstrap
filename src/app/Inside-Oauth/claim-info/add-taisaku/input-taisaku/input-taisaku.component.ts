import {Component, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
import {InsideMainService} from "../../../inside-main.service";
import {TaisakuSelectComponent} from "../../../Dialog/taisaku-select/taisaku-select.component";
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";
@Component({
  selector: 'app-input-taisaku',
  templateUrl: './input-taisaku.component.html',
  styleUrls: ['./input-taisaku.component.css']
})
export class InputTaisakuComponent  {
  @ViewChild("selectTaisakuDialog") taisakuSelectComponent: TaisakuSelectComponent;
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  Data:string;

  name:string;
  siten:string;
  busyo:string;
  taisakusyubetu:string;
  syubetuvalue:string;
  naiyou:string;
  password:string;
  claimList:any[]=[];

  claimInfo: FirebaseObjectObservable<any[]>;
  taisakuSyubetu:any[]=[];
  memberList:any[]=[];
  taisakuSyubetuList:any[]=[];

  uid:string;
  myForm: FormGroup;
  Info: FirebaseListObservable<any[]>;
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;
InfoData:any[]=[];
mb:number;
//key:string;
  claimitem:any;
  OnOff:boolean=true;
  fileup:boolean;
  public constructor(private insideMainService:InsideMainService,private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,private insideService:InsideService) {
    this.fileup=this.insideMainService.fileup;
    this.insideMainService.flagChangeError$.subscribe((error)=>{
      this.errorData=error;
      this.errorDialogComponent.openDialog();
    })


    this.uid=this.oauthInfoService.uid;
    this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
    this.memberList=this.insideService.memberList;
   // this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;

    this.myForm = this.fb.group({
      "taisakusyubetu": ['',
        Validators.required
      ],
      "syubetuvalue": [''],
      "toukousya": ['',
        Validators.required
      ],
      "branch": [''],
      "dt": [''],
      "naiyou": ['',Validators.compose([
          Validators.required
        ]
      )],
      "password": ['',Validators.compose([
          Validators.required
        ]
      )],
      "label": ['']

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

  addTaisakuSyubetu(){
    this.taisakuSelectComponent.openDialog();

  }

  onAdd(){
    this.progressDialogComponent.openDialog()
    let time=this.dt.getTime();
  //  console.log(this.dt)
  //  console.log(time)
    const Info = {
      seihin:this.claimitem.seihin,
      syubetu:this.taisakusyubetu,
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      taisakubi:time,
      naiyou:this.naiyou,
      password:this.password,
      claimkey:this.claimitem.key,
      koukasu:0,
      startAt: firebase.database.ServerValue.TIMESTAMP,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.mb=this.insideMainService.getByteLength(JSON.stringify(Info));//アップするデータをメガバイトで取得

    this.Info=this.af.database.list('TaisakuData/'+this.uid)
    this.Info.push(Info).then(data=>{
      this.addTaisakuSu();
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,})
      this.insideService.InfoData=this.InfoData
    }).catch(error=>{
      this.progressDialogComponent.closeDialog();
      this.errorData=error.message;
      this.errorDialogComponent.openDialog()
    })
  }
  addTaisakuSu(){//クレーム情報の対応数をプラス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
       // console.log(this.claimList[key].taiou)
        const claimInfo = {
          taisaku:this.claimList[key].taisaku+1,
          taisakuUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{
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
  // addTaisakuSyubetu(){
  //
  //   this.insideMainService.addTaisakuSelect(this.uid,this.syubetuvalue,this.name).then(data=>{
  //
  //   }).catch(error=>{
  //
  //   })
  // }

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
