import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
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
key:string;
  newkoukaList:any[]=[];
  @ViewChild("editKoukaDialog") koukaDialogComponent: KoukaDialogComponent;
  constructor(private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    this.key=this.insideService.claimitem.key;
    this.insideService.flagChangeKouka$.subscribe(
      flag => {
        //  console.log('対策');
        this.koukaList=[];
        this.newkoukaList=[];
        this.koukaList=this.insideService.koukaList
        for(let key in this.koukaList){
          if(this.key==this.koukaList[key].claimkey){
            this.newkoukaList.push(this.koukaList[key])
          }
        }

      })


  }


  ngOnInit() {
    this.koukaList=this.insideService.koukaList

    for(let key in this.koukaList){
      if(this.key==this.koukaList[key].claimkey){
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
    this.insideService.deleteKouka(this.koukaData.key,this.uid)
    this.koukaList=[];
    this.newkoukaList=[];
    this.koukaList=this.insideService.koukaList
    for(let key in this.koukaList){
      if(this.key==this.koukaList[key].claimkey){
        this.newkoukaList.push(this.koukaList[key])
      }
    }

  }

}
