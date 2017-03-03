import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {TaisakuDialogComponent} from "../../../Dialog/edit-dialog/taisaku-dialog/taisaku-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";
import {TaisakuDeleteDialogComponent} from "../../../Dialog/delete-dialog/taisaku-delete-dialog/taisaku-delete-dialog.component";
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
  InfoData:any[]=[];
  fileList:any[]=[];
  newfileList:any[]=[];
  jyoukyouData;
//key:string;
  passwordData:any[]=[];
  key:string;
  Data2:any[]=[];
  @ViewChild("editTaisakuDialog") taisakuDialogComponent: TaisakuDialogComponent;
  @ViewChild("deleteTaisakuDialog") taisakuDeleteDialogComponent: TaisakuDeleteDialogComponent;
  constructor(private insideMainService:InsideMainService,private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
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
    this.insideService.flagChangeTaisakuDelete$.subscribe(
      flag => {
        this.key=this.insideMainService.taisakukey
        this.Data2=this.insideMainService.taisakuData;
        //console.log(this.Data2)
        for(let key in this.Data2){

          //  console.log(this.Data2[key])
          if(this.Data2[key].key==this.key){
            this.Data2.splice(Number(key),1);
          }
        }
        this.newtaisakuList=this.Data2;
      })

  }

  ngOnInit() {
    this.taisakuList=this.insideService.taisakuList
    for(let key in this.taisakuList){
      if(this.claimitem.key==this.taisakuList[key].claimkey){
        this.newtaisakuList.push(this.taisakuList[key])
      }
    }
    this.fileList=this.insideService.fileList
    for(let key in this.fileList){
      //  console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='対策'){
        this.newfileList.push(this.fileList[key])
      }
    }

  }

  View(index){
    this.OnOff=true;
    this.index=index;
    this.taisakuData=this.newtaisakuList[index];
    // console.log(this.taiouData.key)
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    for(let key in this.newfileList){

      // console.log(this.newfileList[key].jyoukyoukey)
      if(this.newfileList[key].jyoukyoukey==this.taisakuData.key){
        //  console.log(this.newfileList[key].jyoukyoukey)
        jyoukyouData.push(this.newfileList[key]);
        passwordData.push(this.taisakuData.password)
      }
    }
    this.jyoukyouData=jyoukyouData;
    this.insideMainService.jyoukyouData=this.jyoukyouData;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
    this.passwordData=passwordData
  }
  addImage(index){
    this.index=index;
    this.taisakuData=this.newtaisakuList[index];
    let jyoukyouData:any[]=[];
    let taisakuData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.taisakuData.key){
        jyoukyouData.push(this.newfileList[key]);
        taisakuData.push(this.taisakuData)
      }
    }
   //  console.log(this.taisakuData)
    if(!jyoukyouData[0]){
      this.InfoData.push({jyoukyoukey:this.taisakuData.key,toukousya:this.taisakuData.name,
        siten:this.taisakuData.siten,busyo:this.taisakuData.busyo,
        claimkey:this.taisakuData.claimkey,doko:'対策',naiyou:this.taisakuData.naiyou})
      this.insideService.InfoData=this.InfoData

      this.router.navigate(['/main/topclaim/addtaisaku/addimagetaisaku']);
    }else{
      this.InfoData.push({jyoukyoukey:jyoukyouData[0].jyoukyoukey,toukousya:jyoukyouData[0].toukousya,
        siten:jyoukyouData[0].siten,busyo:jyoukyouData[0].busyo,
        claimkey:jyoukyouData[0].claimkey,doko:'対策',naiyou:taisakuData[0].naiyou})
      this.insideService.InfoData=this.InfoData

      this.router.navigate(['/main/topclaim/addtaisaku/addimagetaisaku']);

    }


  }

  Close(){
    this.OnOff=false;

  }

  setEdit(index){

    this.index=index
    this.taisakuData=this.newtaisakuList[index];
     this.taisakuDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index;
    this.taisakuData=this.newtaisakuList[index];
    this.insideMainService.taisakuData=this.newtaisakuList;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
    this.taisakuDeleteDialogComponent.openDialog();
    //  this.deleteTaiou(this.taiouData.key,this.uid)
  }

  // deleteTaisaku(key:string,uid:string){
  //   this.taisakus=this.af.database.list('TaisakuData/'+this.uid)
  //   this.taisakus.remove(key)
  //     .then(data=>{
  //       this.taisakuList=[];
  //       this.newtaisakuList=[];
  //       this.taisakuList=this.insideService.taisakuList
  //       for(let key in this.taisakuList){
  //         if(this.claimitem.key==this.taisakuList[key].claimkey){
  //           this.newtaisakuList.push(this.taisakuList[key])
  //         }
  //       }
  //       this.minusTaisakuSu()
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  //
  //
  // minusTaisakuSu(){//クレーム情報の対応数をマイナス
  //
  //   this.claimList=this.insideService.claimList
  //   for(let key in this.claimList) {
  //     if (this.claimList[key].key == this.claimitem.key) {
  //       let su:number;
  //       su=this.claimList[key].taisaku-1
  //       if(su<0){
  //         su=0;
  //       }
  //       const claimInfo = {
  //         taisaku:su,
  //         updateAt: firebase.database.ServerValue.TIMESTAMP
  //       };
  //       this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
  //       this.claimInfo.update(claimInfo).then(data=>{
  //
  //       }).catch(error=>{
  //
  //       })
  //     }
  //   }
  // }
  //


}
