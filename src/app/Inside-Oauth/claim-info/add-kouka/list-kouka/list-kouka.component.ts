import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {KoukaDialogComponent} from "../../../Dialog/edit-dialog/kouka-dialog/kouka-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-list-kouka',
  templateUrl: './list-kouka.component.html',
  styleUrls: ['./list-kouka.component.css']
})
export class ListKoukaComponent implements OnInit {
  koukaList:any[]=[];
  index:number;
  koukaData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
//key:string;
  newkoukaList:any[]=[];
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  koukas: FirebaseListObservable<any[]>;
  @ViewChild("editKoukaDialog") koukaDialogComponent: KoukaDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    //this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
    this.insideService.flagChangeKouka$.subscribe(
      flag => {
        //  console.log('対策');
        this.koukaList=[];
        this.newkoukaList=[];
        this.koukaList=this.insideService.koukaList
        for(let key in this.koukaList){
          if(this.claimitem.key==this.koukaList[key].claimkey){
            this.newkoukaList.push(this.koukaList[key])
          }
        }

      })


  }


  ngOnInit() {
    this.koukaList=this.insideService.koukaList

    for(let key in this.koukaList){
      if(this.claimitem.key==this.koukaList[key].claimkey){
          this.newkoukaList.push(this.koukaList[key])
      }
    }

  }

  setEdit(index){
    this.index=index
    this.koukaData=this.koukaList[index];
    this.koukaDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.koukaData=this.koukaList[index];
    this.deleteKouka(this.koukaData.key,this.uid)
   }



  deleteKouka(key:string,uid:string){
    this.koukas=this.af.database.list('KoukaData/'+this.uid)
    this.koukas.remove(key)
      .then(data=>{
        this.koukaList=[];
        this.newkoukaList=[];
        this.koukaList=this.insideService.koukaList
        for(let key in this.koukaList){
          if(this.claimitem.key==this.koukaList[key].claimkey){
            this.newkoukaList.push(this.koukaList[key])
          }
        }
        this.minusKoukaSu()
      })
      .catch(error=>{


      });
  }

  minusKoukaSu(){//クレーム情報の対応数をマイナス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        let su:number;
        su=this.claimList[key].kouka-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          kouka:su
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }



}
