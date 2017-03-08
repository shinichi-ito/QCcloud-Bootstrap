import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {TaiouDialogComponent} from "../../../Dialog/edit-dialog/taiou-dialog/taiou-dialog.component";
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";
import {TaiouDeleteDialogComponent} from "../../../Dialog/delete-dialog/taiou-delete-dialog/taiou-delete-dialog.component";
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
   passwordData:any[]=[];
   key:string;
   Data2:any[]=[];
  @ViewChild("editTaiouDialog") taiouDialogComponent: TaiouDialogComponent;
  @ViewChild("deleteTaiouDialog") taiouDeleteDialogComponent: TaiouDeleteDialogComponent;
 constructor(private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,
             private insideService:InsideService,private insideMainService:InsideMainService) {
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
     })

   this.insideService.flagChangeTaiouDelete$.subscribe(
     flag => {
       this.key=this.insideMainService.taioukey
       this.Data2=this.insideMainService.taiouData;
      //console.log(this.Data2)
       for(let key in this.Data2){

       //  console.log(this.Data2[key])
          if(this.Data2[key].key==this.key){
           this.Data2.splice(Number(key),1);
          }
       }
       this.newtaiouList=this.Data2;
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
  //  console.log(this.taiouData)
   this.taiouDialogComponent.openDialog();
  }

  Delete(index){
  this.index=index;
    this.taiouData=this.newtaiouList[index];
    this.insideMainService.taiouData=this.newtaiouList;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管

    this.taiouDeleteDialogComponent.openDialog();
    //  this.deleteTaiou(this.taiouData.key,this.uid)
   }
   Edit(){




   }



  View(index){
    this.OnOff=!this.OnOff;//対象の画像の一覧を表示
    this.index=index;
    this.taiouData=this.newtaiouList[index];
    this.insideService.shareData=this.taiouData;
  //  console.log(this.taiouData)
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    for(let key in this.newfileList){

    //  console.log(this.newfileList[key].jyoukyoukey)
    //  console.log(this.taiouData.key)
      if(this.newfileList[key].jyoukyoukey==this.taiouData.key){
      // console.log(this.newfileList[key].jyoukyoukey)
        jyoukyouData.push(this.newfileList[key]);
        passwordData.push(this.taiouData.password)
       }
     }
       this.jyoukyouData=jyoukyouData;
 //   this.insideMainService.jyoukyouData=this.jyoukyouData;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
       this.passwordData=passwordData;
  }
  addImage(index){
    this.insideMainService.setActive(false);
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

  // deleteTaiou(key:string,uid:string){
  //   this.taious=this.af.database.list('TaiouData/'+this.uid)
  //   this.taious.remove(key)
  //     .then(data=>{
  //       this.taiouList=[];
  //       this.newtaiouList=[];
  //       this.taiouList=this.insideService.taiouList
  //       for(let key in this.taiouList){
  //         if(this.claimitem.key==this.taiouList[key].claimkey){
  //           this.newtaiouList.push(this.taiouList[key])
  //         }
  //       }
  //   this.minusTaiouSu()
  //
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  // minusTaiouSu(){//クレーム情報の対応数をマイナス
  //
  //   this.claimList=this.insideService.claimList
  //   for(let key in this.claimList) {
  //     if (this.claimList[key].key == this.claimitem.key) {
  //       console.log(this.claimList[key].taiou)
  //
  //       let su:number;
  //       su=this.claimList[key].taiou-1
  //       if(su<0){
  //         su=0;
  //       }
  //       const claimInfo = {
  //         taiou:su,
  //         updateAt: firebase.database.ServerValue.TIMESTAMP
  //       };
  //       this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
  //       this.claimInfo.update(claimInfo).then(data=>{
  //
  //       }).catch(error=>{
  //
  //       })
  //   }
  //   }
  // }


}
