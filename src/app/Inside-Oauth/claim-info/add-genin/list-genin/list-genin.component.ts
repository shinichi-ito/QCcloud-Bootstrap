import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {GeninDialogComponent} from "../../../Dialog/edit-dialog/genin-dialog/genin-dialog.component";

@Component({
  selector: 'app-list-genin',
  templateUrl: './list-genin.component.html',
  styleUrls: ['./list-genin.component.css']
})
export class ListGeninComponent implements OnInit {
  geninList:any[]=[];
  newgeninList:any[]=[];
  index:number;
  geninData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
  genins: FirebaseListObservable<any[]>;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
//key:string;
  @ViewChild("editGeninDialog") geninDialogComponent: GeninDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
   // this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
    this.insideService.flagChangeGenin$.subscribe(
      flag => {
        //  console.log('対策');
        this.geninList=[];
        this.newgeninList=[];
        this.geninList=this.insideService.geninList
        for(let key in this.geninList){
          if(this.claimitem.key==this.geninList[key].claimkey){
            this.newgeninList.push(this.geninList[key])
          }
        }

      })



  }

  ngOnInit() {
    this.geninList=this.insideService.geninList
    for(let key in this.geninList){
      if(this.claimitem.key==this.geninList[key].claimkey){
         this.newgeninList.push(this.geninList[key])
      }
    }
  }

  setEdit(index){
    this.index=index
    this.geninData=this.geninList[index];
    this.geninDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.geninData=this.geninList[index];
    this.deleteGenin(this.geninData.key,this.uid)

  }
  deleteGenin(key:string,uid:string){
    this.genins=this.af.database.list('GeninData/'+this.uid)
    this.genins.remove(key)
      .then(data=>{
        this.geninList=[];
        this.newgeninList=[];
        this.geninList=this.insideService.geninList
        for(let key in this.geninList){
          if(this.claimitem.key==this.geninList[key].claimkey){
            this.newgeninList.push(this.geninList[key])
          }
        }
       this.minusGeninSu()
      })
      .catch(error=>{


      });
  }
  minusGeninSu(){//クレーム情報の対応数をマイナス
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
         let su:number;
        su=this.claimList[key].genin-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          genin:su
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }



}
