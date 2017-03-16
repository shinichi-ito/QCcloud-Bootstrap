import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {InsideMainService} from "../../../inside-main.service";
@Component({
  selector: 'app-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css']
})
export class InputCommentComponent  {
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  password:string;
  model;
  memberList:any[]=[];

  uid:string;
  myForm: FormGroup;
  Info: FirebaseListObservable<any[]>;
  claimList:any[]=[];
//key:string;
  claimitem:any;
  InfoData:any[]=[];
  claimInfo: FirebaseObjectObservable<any[]>;
  public constructor(private insideMainService:InsideMainService,private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,
                     private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    this.memberList=this.insideService.memberList;
    this.model = {
      label: "kari"
    };
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
    const Info = {
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      naiyou:this.naiyou,
      password:this.password,
      koukai:this.model.label,
      claimkey:this.claimitem.key,
      startAt: firebase.database.ServerValue.TIMESTAMP,
    //  updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.Info=this.af.database.list('CommentData/'+this.uid)
    this.Info.push(Info).then(data=>{
      this.addCommentSu();
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,})
      this.insideService.InfoData=this.InfoData
    }).catch(error=>{

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
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{
         this.insideMainService.onFileUpSuMain(this.uid)//対応や対策のデータを登録時　その月のファイルアップロード数を加算する
        }).catch(error=>{

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
