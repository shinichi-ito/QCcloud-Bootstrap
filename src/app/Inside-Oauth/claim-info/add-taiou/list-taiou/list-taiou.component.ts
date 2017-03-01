import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";

import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {TaiouDialogComponent} from "../../../Dialog/edit-dialog/taiou-dialog/taiou-dialog.component";
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
  @ViewChild("editTaiouDialog") taiouDialogComponent: TaiouDialogComponent;
 constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
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
this.Image=this.newtaiouList[0].downloadURL
       console.log(this.Image)
     })


 }

  ngOnInit() {
    this.taiouList=this.insideService.taiouList
   for(let key in this.taiouList){
    if(this.claimitem.key==this.taiouList[key].claimkey){
      //  console.log(this.key)
    // console.log(this.taiouList[key].claimkey)

       this.newtaiouList.push(this.taiouList[key])
      }
   }
    this.fileList=this.insideService.fileList
    for(let key in this.fileList){
      console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='対応'){
        //  console.log(this.key)
     //  console.log(this.fileList[key])

        this.newfileList.push(this.fileList[key])

      }
    }
   //  this.Image=this.newfileList[0].downloadURL

  }

  setEdit(index){
    this.index=index
    this.taiouData=this.newtaiouList[index];
   this.taiouDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.taiouData=this.newtaiouList[index];
    this.deleteTaiou(this.taiouData.key,this.uid)
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
          taiou:su
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
    }
    }
  }


}
