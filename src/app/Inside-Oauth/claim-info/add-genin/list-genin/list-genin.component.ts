import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
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
  index:number;
  geninData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;

  @ViewChild("editGeninDialog") geninDialogComponent: GeninDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    this.geninList=this.insideService.geninList
  }

  setEdit(index){
    this.index=index
    this.geninData=this.geninList[index];
    this.geninDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.geninData=this.geninList[index];
    this.insideService.deleteGenin(this.geninData.key,this.uid)
  }

}
