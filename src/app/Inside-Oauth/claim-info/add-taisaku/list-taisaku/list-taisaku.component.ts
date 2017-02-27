import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {TaisakuDialogComponent} from "../../../Dialog/edit-dialog/taisaku-dialog/taisaku-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-list-taisaku',
  templateUrl: './list-taisaku.component.html',
  styleUrls: ['./list-taisaku.component.css']
})
export class ListTaisakuComponent implements OnInit {
  taisakuList:any[]=[];
  index:number;
  taisakuData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;

  @ViewChild("editTaisakuDialog") taisakuDialogComponent: TaisakuDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    this.taisakuList=this.insideService.taisakuList
  }

  setEdit(index){
    this.index=index
    this.taisakuData=this.taisakuList[index];
    this.taisakuDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index
    this.taisakuData=this.taisakuList[index];
    this.insideService.deleteTaisaku(this.taisakuData.key,this.uid)
  }
}
