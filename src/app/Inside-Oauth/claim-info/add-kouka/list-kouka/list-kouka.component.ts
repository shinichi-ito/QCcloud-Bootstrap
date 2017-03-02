import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {KoukaDialogComponent} from "../../../Dialog/edit-dialog/kouka-dialog/kouka-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
import {Router} from "@angular/router";

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
  jyoukyouData;
  InfoData:any[]=[];
  OnOff:boolean=false;
  fileList:any[]=[];
  newfileList:any[]=[];
  @ViewChild("editKoukaDialog") koukaDialogComponent: KoukaDialogComponent;
  constructor(private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
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
    this.fileList=this.insideService.fileList
    for(let key in this.fileList){
      //  console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='効果'){
        this.newfileList.push(this.fileList[key])
      }
    }
  }


  View(index){
    this.OnOff=true;
    this.index=index;
    this.koukaData=this.newkoukaList[index];
    // console.log(this.taiouData.key)
    let jyoukyouData:any[]=[];
    for(let key in this.newfileList){

      // console.log(this.newfileList[key].jyoukyoukey)
      if(this.newfileList[key].jyoukyoukey==this.koukaData.key){
        //  console.log(this.newfileList[key].jyoukyoukey)
        jyoukyouData.push(this.newfileList[key]);
      }
    }
    this.jyoukyouData=jyoukyouData
  }
  addImage(index){
    this.index=index;
    this.koukaData=this.newkoukaList[index];
    let jyoukyouData:any[]=[];
    let koukaData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.koukaData.key){
        jyoukyouData.push(this.newfileList[key]);
        koukaData.push(this.koukaData)
      }
    }
    // console.log(taiouData[0])
    if(!jyoukyouData[0]){
      this.InfoData.push({jyoukyoukey:this.koukaData.key,toukousya:this.koukaData.name,
        siten:this.koukaData.siten,busyo:this.koukaData.busyo,
        claimkey:this.koukaData.claimkey,doko:'効果',naiyou:this.koukaData.naiyou})
      this.insideService.InfoData=this.InfoData
      this.router.navigate(['/main/topclaim/addkouka/addimagekouka']);
    }else {


      this.InfoData.push({
        jyoukyoukey: jyoukyouData[0].jyoukyoukey, toukousya: jyoukyouData[0].toukousya,
        siten: jyoukyouData[0].siten, busyo: jyoukyouData[0].busyo,
        claimkey: jyoukyouData[0].claimkey, doko: '対応', naiyou: koukaData[0].naiyou
      })
      this.insideService.InfoData = this.InfoData

      this.router.navigate(['/main/topclaim/addkouka/addimagekouka']);
    }
  }

  Close(){
    this.OnOff=false;

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
          kouka:su,
          updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }



}
