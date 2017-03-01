import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {TaisakuDialogComponent} from "../../../Dialog/edit-dialog/taisaku-dialog/taisaku-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-list-taisaku',
  templateUrl: './list-taisaku.component.html',
  styleUrls: ['./list-taisaku.component.css']
})
export class ListTaisakuComponent implements OnInit {
  taisakuList:any[]=[];
  newtaisakuList:any[]=[];
  index:number;
  taisakuData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
  taiouList:any[]=[];
  newtaiouList:any[]=[];
  OnOff:boolean=false;
  taisakus: FirebaseListObservable<any[]>;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
//key:string;
  @ViewChild("editTaisakuDialog") taisakuDialogComponent: TaisakuDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    //this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;

    this.insideService.flagChangeTaisaku$.subscribe(
      flag => {
        //  console.log('対策');
        this.taisakuList=[];
        this.newtaisakuList=[];
        this.taisakuList=this.insideService.taisakuList
        for(let key in this.taisakuList){
          if(this.claimitem.key==this.taisakuList[key].claimkey){
            this.newtaisakuList.push(this.taisakuList[key])
          }
        }

      })

  }

  ngOnInit() {
    this.taisakuList=this.insideService.taisakuList
    for(let key in this.taisakuList){
      if(this.claimitem.key==this.taisakuList[key].claimkey){
        this.newtaisakuList.push(this.taisakuList[key])
      }
    }

  }
  setEdit(index){

    this.index=index
    this.taisakuData=this.newtaisakuList[index];
     this.taisakuDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.taisakuData=this.taisakuList[index];
    this.deleteTaisaku(this.taisakuData.key,this.uid)
  }

  deleteTaisaku(key:string,uid:string){
    this.taisakus=this.af.database.list('TaisakuData/'+this.uid)
    this.taisakus.remove(key)
      .then(data=>{
        this.taisakuList=[];
        this.newtaisakuList=[];
        this.taisakuList=this.insideService.taisakuList
        for(let key in this.taisakuList){
          if(this.claimitem.key==this.taisakuList[key].claimkey){
            this.newtaisakuList.push(this.taisakuList[key])
          }
        }
        this.minusTaisakuSu()
      })
      .catch(error=>{


      });
  }


  minusTaisakuSu(){//クレーム情報の対応数をマイナス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        let su:number;
        su=this.claimList[key].taisaku-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          taisaku:su
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }



}
