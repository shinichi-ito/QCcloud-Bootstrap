import {Component, OnInit, ViewChild} from '@angular/core';
import * as firebase from 'firebase'
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {InsideMainService} from "../../../inside-main.service";
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";
@Component({
  selector: 'app-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css']
})
export class InputCommentComponent  {
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  Data:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  password:string;

  memberList:any[]=[];
mb:number;
  uid:string;
  myForm: FormGroup;
  Info: FirebaseListObservable<any[]>;
  claimList:any[]=[];
//key:string;
  claimitem:any;
  InfoData:any[]=[];
  claimInfo: FirebaseObjectObservable<any[]>;
  OnOff:boolean=true;
  public constructor(private insideMainService:InsideMainService,private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,
                     private insideService:InsideService) {
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
  }



  onAdd(){
    this.progressDialogComponent.openDialog();
    const Info = {
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      naiyou:this.naiyou,
      password:this.password,
      claimkey:this.claimitem.key,
      startAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.mb=this.insideMainService.getByteLength(JSON.stringify(Info));//アップするデータをメガバイトで取得
    this.Info=this.af.database.list('CommentData/'+this.uid);
    this.Info.push(Info).then(data=>{
      this.addCommentSu();
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,});
      this.insideService.InfoData=this.InfoData
    }).catch(error=>{
      this.progressDialogComponent.closeDialog();
      this.errorData=error.message;
      this.errorDialogComponent.openDialog()
    })
  }
  addCommentSu(){//クレーム情報の対応数をプラス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        const claimInfo = {
          comment:this.claimList[key].comment+1,
           commentUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key);
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


}
