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
  index:number;
  taiouData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;

  @ViewChild("editTaiouDialog") taiouDialogComponent: TaiouDialogComponent;
 constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    this.taiouList=this.insideService.taiouList
  }

  setEdit(index){
    this.index=index
    this.taiouData=this.taiouList[index];
   this.taiouDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.taiouData=this.taiouList[index];
    this.insideService.deleteTaiou(this.taiouData.key,this.uid)
  }
}
