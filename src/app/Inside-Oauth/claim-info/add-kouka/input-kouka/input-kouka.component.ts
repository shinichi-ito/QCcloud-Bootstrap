import { Component } from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-input-kouka',
  templateUrl: './input-kouka.component.html',
  styleUrls: ['./input-kouka.component.css']
})
export class InputKoukaComponent  {
  name:string;
  siten:string;
  busyo:string;


  naiyou:string;
  password:string;

  model;
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
  myForm: FormGroup;
  koukaInfo: FirebaseListObservable<any[]>;
  aa:number=5;
  bb:number=5;
  cc:number=5;
  dd:number=5;
//key:string;
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  claimList:any[]=[];
  public constructor(private fb: FormBuilder,private oauthInfoService:OauthInfoService,
                     private af : AngularFire,private insideService:InsideService) {
    //this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
    this.model = {
      label: "kari"
    };
    this.myForm = this.fb.group({
      "toukousya": ['',
        Validators.required
      ],
      "branch": [''],
      "dt": [''],
      "aa": [''],
      "bb": [''],
      "cc": [''],
      "dd": [''],

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
    const Info = {
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      kakuninbi:this.dt,
      aa:this.aa,
      bb:this.bb,
      cc:this.cc,
      dd:this.dd,
      naiyou:this.naiyou,
      password:this.password,
      koukai:this.model.label,
      claimkey:this.claimitem.key,
      startAt: firebase.database.ServerValue.TIMESTAMP,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.koukaInfo=this.af.database.list('KoukaData/'+this.uid)
    this.koukaInfo.push(Info).then(data=>{
      this.addKoukaSu()
      this.InfoData.push({key:data.key,name:this.name,siten:this.siten,busyo:this.busyo,})
      this.insideService.InfoData=this.InfoData

    }).catch(error=>{

    })
  }
  addKoukaSu(){//クレーム情報の対応数をプラス
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        const claimInfo = {
          kouka:this.claimList[key].kouka+1
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
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public open(): void {
    this.opened = !this.opened;
  }

}
