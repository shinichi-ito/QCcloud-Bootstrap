import { Component, OnInit } from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {OauthInfoService} from "../../oauth-info.service";
import {InsideService} from "../../Inside.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-add-taisaku',
  templateUrl: './add-taisaku.component.html',
  styleUrls: ['./add-taisaku.component.css']
})
export class AddTaisakuComponent  {
  name:string;
  siten:string;
  busyo:string;
  taisakusyubetu:string;
  syubetuvalue:string;
  naiyou:string;
  password:string;

  model;
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

  public constructor(private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    this.taisakuSyubetuList=this.insideService.taisakuList;
    this.memberList=this.insideService.memberList;
    this.model = {
      label: "kari"
    };
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


  }

  onAdd(){
    const claimInfo = {
      syubetu:this.taisakusyubetu,
      name:this.name,
      gaiyou:this.siten,
      siten:this.busyo,
      taisakubi:this.dt,
      naiyou:this.naiyou,
      password:this.password,
      koukai:this.model.label,
      startAt: firebase.database.ServerValue.TIMESTAMP,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.Info=this.af.database.list('TaisakuData/'+this.uid)
    this.Info.push(claimInfo).then(data=>{

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

  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public open(): void {
    this.opened = !this.opened;
  }

}
