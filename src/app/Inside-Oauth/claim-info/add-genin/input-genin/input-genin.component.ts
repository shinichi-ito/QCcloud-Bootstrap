import {Component, ViewChild} from '@angular/core';
import * as firebase from 'firebase'
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {OauthInfoService} from "../../../oauth-info.service";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {InsideService} from "../../../Inside.service";
import {InsideMainService} from "../../../inside-main.service";
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";
@Component({
  selector: 'app-input-genin',
  templateUrl: './input-genin.component.html',
  styleUrls: ['./input-genin.component.css']
})
export class InputGeninComponent {

  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  Data:string;


  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  password:string;
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;

  claimInfo: FirebaseObjectObservable<any[]>;


//key:string;
  memberList:any[]=[];
  claimitem:any;

  uid:string;
  myForm: FormGroup;
  Info: FirebaseListObservable<any[]>;

  InfoData:any[]=[];
  claimList:any[]=[];
  mb:number;
  OnOff:boolean=true;
  fileup:boolean;
  public constructor(private insideMainService:InsideMainService,private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,private insideService:InsideService) {
    this.fileup=this.insideMainService.fileup;

    this.uid=this.oauthInfoService.uid;
    this.memberList=this.insideService.memberList;


    this.insideMainService.flagChangeError$.subscribe((error)=>{
      this.errorData=error;
      this.errorDialogComponent.openDialog();
    });

    this.myForm = this.fb.group({

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
   // this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
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
      naiyou:this.naiyou,
      password:this.password,
      kakuninbi:time,
      claimkey:this.claimitem.key,
      startAt: firebase.database.ServerValue.TIMESTAMP,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };

    this.mb=this.insideMainService.getByteLength(JSON.stringify(Info));//アップするデータをメガバイトで取得
    this.Info=this.af.database.list('GeninData/'+this.uid);
    this.Info.push(Info).then(data=>{
      this.addGeninSu()
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,})
      this.insideService.InfoData=this.InfoData
    }).catch(error=>{
      this.progressDialogComponent.closeDialog();
      this.errorData=error.message;
      this.errorDialogComponent.openDialog()
    })
  }
  addGeninSu(){//クレーム情報の対応数をプラス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        const claimInfo = {
          genin:this.claimList[key].genin+1,
           geninUp: firebase.database.ServerValue.TIMESTAMP
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
