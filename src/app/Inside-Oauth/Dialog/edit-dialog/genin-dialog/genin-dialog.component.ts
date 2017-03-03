import {Component, OnInit, ViewChild, Input} from '@angular/core';
import * as firebase from 'firebase'
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {ModalDirective} from "ng2-bootstrap";
@Component({
  selector: 'app-genin-dialog',
  templateUrl: './genin-dialog.component.html',
  styleUrls: ['./genin-dialog.component.css']
})
export class GeninDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() geninData;//親コンポーネントから受取る属性
  value: FirebaseObjectObservable<any>;
  uid:string;
  name:string='';
  siten:string='';
  busyo:string='';
  syubetu:string='';
  naiyou:string='';
  pass:string;
  OnOff:boolean=false;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
  onEdit(){
    if(this.geninData.password==this.pass){
    if(this.name==''){
      this.name=this.geninData.name
    //  console.log(this.name)
    }
    if(this.siten==''){
      this.siten=this.geninData.siten
      // console.log(this.siten)
    }
    if(this.busyo==''){
      this.busyo=this.geninData.busyo
      //console.log(this.busyo)
    }

    if(this.naiyou==''){
      this.naiyou=this.geninData.naiyou
      //console.log(this.syubetu)
    }
    const Info = {
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      naiyou:this.naiyou,
      updateAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.value = this.af.database.object('GeninData/' + this.uid + '/'+this.geninData.key);
    this.value.update(Info).then(data=>{
      this.modalRef.hide()
    }).catch(error=>{
    })
  }else{

  this.OnOff=true;

}
  }


}
