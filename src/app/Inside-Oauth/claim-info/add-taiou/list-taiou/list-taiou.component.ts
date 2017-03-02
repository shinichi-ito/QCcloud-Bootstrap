import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {TaiouDialogComponent} from "../../../Dialog/edit-dialog/taiou-dialog/taiou-dialog.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-list-taiou',
  templateUrl: './list-taiou.component.html',
  styleUrls: ['./list-taiou.component.css']
})
export class ListTaiouComponent implements OnInit {
taiouList:any[]=[];
  newtaiouList:any[]=[];
  fileList:any[]=[];
  newfileList:any[]=[];
  index:number;
  taiouData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
  taious: FirebaseListObservable<any[]>;
//key:string;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  Image:string;
  jyoukyouData;
  InfoData:any[]=[];
   OnOff:boolean=false;
  @ViewChild("editTaiouDialog") taiouDialogComponent: TaiouDialogComponent;
 constructor(private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  // this.key=this.insideService.claimitem.key;
   this.claimitem=this.insideService.claimitem;
   this.insideService.flagChangeTaiou$.subscribe(
     flag => {
       //  console.log('対策');
       this.taiouList=[];
       this.newtaiouList=[];
       this.taiouList=this.insideService.taiouList
       for(let key in this.taiouList){
         if(this.claimitem.key==this.taiouList[key].claimkey){
           this.newtaiouList.push(this.taiouList[key])
         }
       }
// this.Image=this.newtaiouList[0].downloadURL
//        console.log(this.Image)
     })


 }

  ngOnInit() {
    this.taiouList=this.insideService.taiouList
   for(let key in this.taiouList){
    if(this.claimitem.key==this.taiouList[key].claimkey){
       this.newtaiouList.push(this.taiouList[key])
      }
   }
    this.fileList=this.insideService.fileList
    for(let key in this.fileList){
    //  console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='対応'){
         this.newfileList.push(this.fileList[key])
      }
    }


  }

  setEdit(index){
    this.index=index;
    this.taiouData=this.newtaiouList[index];
   this.taiouDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index;
    this.taiouData=this.newtaiouList[index];
    this.deleteTaiou(this.taiouData.key,this.uid)
   }
  View(index){
    this.OnOff=true;
    this.index=index;
    this.taiouData=this.newtaiouList[index];
   // console.log(this.taiouData.key)
    let jyoukyouData:any[]=[];
    for(let key in this.newfileList){

     // console.log(this.newfileList[key].jyoukyoukey)
      if(this.newfileList[key].jyoukyoukey==this.taiouData.key){
      //  console.log(this.newfileList[key].jyoukyoukey)
        jyoukyouData.push(this.newfileList[key]);
       }
     }
       this.jyoukyouData=jyoukyouData
  }
  addImage(index){
    this.index=index;
    this.taiouData=this.newtaiouList[index];
    let jyoukyouData:any[]=[];
    let taiouData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.taiouData.key){
         jyoukyouData.push(this.newfileList[key]);
         taiouData.push(this.taiouData)
      }
    }
   // console.log(taiouData[0])
    if(!jyoukyouData[0]){
      this.InfoData.push({jyoukyoukey:this.taiouData.key,toukousya:this.taiouData.name,
        siten:this.taiouData.siten,busyo:this.taiouData.busyo,
        claimkey:this.taiouData.claimkey,doko:'対応',naiyou:this.taiouData.naiyou})
      this.insideService.InfoData=this.InfoData
      this.router.navigate(['/main/topclaim/addtaiou/addimagetaiou']);
    }else {


      this.InfoData.push({
        jyoukyoukey: jyoukyouData[0].jyoukyoukey, toukousya: jyoukyouData[0].toukousya,
        siten: jyoukyouData[0].siten, busyo: jyoukyouData[0].busyo,
        claimkey: jyoukyouData[0].claimkey, doko: '対応', naiyou: taiouData[0].naiyou
      })
      this.insideService.InfoData = this.InfoData

      this.router.navigate(['/main/topclaim/addtaiou/addimagetaiou']);
    }
  }

  Close(){
    this.OnOff=false;

  }

  deleteTaiou(key:string,uid:string){
    this.taious=this.af.database.list('TaiouData/'+this.uid)
    this.taious.remove(key)
      .then(data=>{
        this.taiouList=[];
        this.newtaiouList=[];
        this.taiouList=this.insideService.taiouList
        for(let key in this.taiouList){
          if(this.claimitem.key==this.taiouList[key].claimkey){
            this.newtaiouList.push(this.taiouList[key])
          }
        }
    this.minusTaiouSu()

      })
      .catch(error=>{


      });
  }
  minusTaiouSu(){//クレーム情報の対応数をマイナス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        console.log(this.claimList[key].taiou)

        let su:number;
        su=this.claimList[key].taiou-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          taiou:su,
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
