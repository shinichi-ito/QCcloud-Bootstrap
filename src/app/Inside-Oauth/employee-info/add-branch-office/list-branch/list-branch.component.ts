import {Component, OnInit, ViewChild} from '@angular/core';
import * as firebase from 'firebase'
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {Subscription} from "rxjs";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.css']
})
export class ListBranchComponent implements OnInit {

  @ViewChild("lgModal") modalRef:ModalDirective;
  index:number;
  sitenData;
  tourokusya:string;
  siten:string;
  sitenname:string;
  tourokusyaname:string;
  uid:string;
  sitenList:any[]=[];
  value: FirebaseObjectObservable<any>;
  private subscription:Subscription;
  constructor( private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }
  ngOnInit() {

    // this.subscription=this.insideService.sitenAdd.subscribe(value=>{
    //   this.insideService.sitenList.push({key:value.key,siten:value.val().siten,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
    // });

    this.subscription=this.insideService.sitenChanged.subscribe(value=>{
      this.insideService.sitenList[this.index]={key:value.key,siten:value.val().siten,tourokusya:value.val().tourokusya,startAt:value.val().startAt}
    });

    this.subscription=this.insideService.sitenRemoved.subscribe(value=>{
      this.insideService.sitenList.splice(this.index,1);
    });
    this.sitenList=this.insideService.sitenList
  }
  setEdit(index){
    this.index=index
    this.sitenData=this.sitenList[index];
    this.sitenname=this.sitenData.siten
    this.tourokusyaname=this.sitenData.tourokusya
    this.modalRef.show()
  }
  onEdit(){
    const sitenInfo = {
      siten:this.sitenname,
      tourokusya:this.tourokusyaname,
      startAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.value = this.af.database.object('companyData/' + this.uid + '/SitenInfo/'+this.sitenData.key);
    this.value.update(sitenInfo).then(data=>{
      this.modalRef.hide()
    }).catch(error=>{
    })
  }
  Delete(index){
    this.index=index
    this.sitenData=this.sitenList[index];
    this.insideService.deleteSiten(this.sitenData.key,this.uid)
  }

}
