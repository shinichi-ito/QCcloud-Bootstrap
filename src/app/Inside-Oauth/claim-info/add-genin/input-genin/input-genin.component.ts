import { Component } from '@angular/core';
import * as firebase from 'firebase'
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {OauthInfoService} from "../../../oauth-info.service";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {InsideService} from "../../../Inside.service";
@Component({
  selector: 'app-input-genin',
  templateUrl: './input-genin.component.html',
  styleUrls: ['./input-genin.component.css']
})
export class InputGeninComponent {
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  password:string;
  claimInfo: FirebaseObjectObservable<any[]>;
  model;

//key:string;
  memberList:any[]=[];
  claimitem:any;

  uid:string;
  myForm: FormGroup;
  Info: FirebaseListObservable<any[]>;

  InfoData:any[]=[];
  claimList:any[]=[];
  public constructor(private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,private insideService:InsideService) {
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
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.Info=this.af.database.list('GeninData/'+this.uid)
    this.Info.push(Info).then(data=>{
      this.addGeninSu()
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,})
      this.insideService.InfoData=this.InfoData
    }).catch(error=>{

    })
  }
  addGeninSu(){//クレーム情報の対応数をプラス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        const claimInfo = {
          genin:this.claimList[key].genin+1
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

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
