import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";

import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {TaiouDialogComponent} from "../../../Dialog/edit-dialog/taiou-dialog/taiou-dialog.component";
@Component({
  selector: 'app-list-taiou',
  templateUrl: './list-taiou.component.html',
  styleUrls: ['./list-taiou.component.css']
})
export class ListTaiouComponent implements OnInit {
taiouList:any[]=[];
  newtaiouList:any[]=[];
  index:number;
  taiouData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
key:string;
  @ViewChild("editTaiouDialog") taiouDialogComponent: TaiouDialogComponent;
 constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
   this.key=this.insideService.claimitem.key;

   this.insideService.flagChangeTaiou$.subscribe(
     flag => {
       //  console.log('対策');
       this.taiouList=[];
       this.newtaiouList=[];
       this.taiouList=this.insideService.taiouList
       for(let key in this.taiouList){
         if(this.key==this.taiouList[key].claimkey){
           this.newtaiouList.push(this.taiouList[key])
         }
       }

     })


 }

  ngOnInit() {
    this.taiouList=this.insideService.taiouList
   for(let key in this.taiouList){
    if(this.key==this.taiouList[key].claimkey){
      //  console.log(this.key)
    // console.log(this.taiouList[key].claimkey)

       this.newtaiouList.push(this.taiouList[key])
      }
   }

  }

  setEdit(index){
    this.index=index
    this.taiouData=this.newtaiouList[index];
   this.taiouDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.taiouData=this.newtaiouList[index];
    this.insideService.deleteTaiou(this.taiouData.key,this.uid)
    this.taiouList=[];
    this.newtaiouList=[];
    this.taiouList=this.insideService.taiouList
    for(let key in this.taiouList){
      if(this.key==this.taiouList[key].claimkey){
        this.newtaiouList.push(this.taiouList[key])
      }
    }



  }
}
