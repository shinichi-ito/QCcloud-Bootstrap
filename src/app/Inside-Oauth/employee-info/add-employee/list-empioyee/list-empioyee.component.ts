import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'

@Component({
  selector: 'app-list-empioyee',
  templateUrl: './list-empioyee.component.html',
  styleUrls: ['./list-empioyee.component.css']
})
export class ListEmpioyeeComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;
  index:number;
  memberData;
  tourokusya:string;
  member:string;
  membername:string;
  sitenname:string;
  busyoname:string;
  tourokusyaname:string;
  uid:string;
  memberList:any[]=[];
  value: FirebaseObjectObservable<any>;
  constructor( private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    this.memberList=this.insideService.memberList
  }
  setEdit(index){
    this.index=index
    this.memberData=this.memberList[index];
    this.membername=this.memberData.name;
    this.sitenname=this.memberData.siten;
    this.busyoname=this.memberData.busyo;
    this.tourokusyaname=this.memberData.tourokusya
    this.modalRef.show()
  }
  onEdit(){
    const memberInfo = {
      name:this.membername,
      siten:this.sitenname,
      busyo:this.busyoname,
      tourokusya:this.tourokusyaname,
      startAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.value = this.af.database.object('companyData/' + this.uid + '/MemberInfo/'+this.memberData.key);
    this.value.update(memberInfo).then(data=>{
      this.modalRef.hide()
    }).catch(error=>{
    })
  }
  Delete(index){
    this.index=index;
    this.memberData=this.memberList[index];
    this.insideService.deleteMember(this.memberData.key,this.uid)
  }

}
