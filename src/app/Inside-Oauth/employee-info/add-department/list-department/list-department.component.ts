import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;
  index:number;
  busyoData;
  tourokusya:string;
  busyo:string;
  busyoname:string;
  tourokusyaname:string;
  uid:string;
  busyoList:any[]=[];
  value: FirebaseObjectObservable<any>;
  constructor( private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  this.busyoList=this.insideService.busyoList
  }
  setEdit(index){
    this.index=index
    this.busyoData=this.busyoList[index];
    this.busyoname=this.busyoData.busyo
    this.tourokusyaname=this.busyoData.tourokusya
    this.modalRef.show()
  }
  onEdit(){
    const busyoInfo = {
      busyo:this.busyoname,
      tourokusya:this.tourokusyaname,
      startAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.value = this.af.database.object('companyData/' + this.uid + '/BusyoInfo/'+this.busyoData.key);
    this.value.update(busyoInfo).then(data=>{
      this.modalRef.hide()
    }).catch(error=>{
    })
  }
  Delete(index){
    this.index=index
    this.busyoData=this.busyoList[index];
    this.insideService.deleteBusyo(this.busyoData.key,this.uid)
  }

}
