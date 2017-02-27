import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
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

  InfoData:any[]=[];

  public constructor(private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,
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

  }



  onAdd(){
    const Info = {
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      naiyou:this.naiyou,
      password:this.password,
      koukai:this.model.label,
      startAt: firebase.database.ServerValue.TIMESTAMP,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.Info=this.af.database.list('CommentData/'+this.uid)
    this.Info.push(Info).then(data=>{
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,})
      this.insideService.InfoData=this.InfoData
    }).catch(error=>{

    })
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
