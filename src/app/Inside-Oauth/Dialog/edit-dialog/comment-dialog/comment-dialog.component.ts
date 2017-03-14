import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() commentData;//親コンポーネントから受取る属性
  value: FirebaseObjectObservable<any>;
  uid:string;
  name:string='';
  siten:string='';
  busyo:string='';
  naiyou:string='';
  pass:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.claimitem;
  }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
  onEdit(){
    if(this.commentData.password==this.pass){
    if(this.name==''){
      this.name=this.commentData.name
      //console.log(this.syubetu)
    }
    if(this.siten==''){
      this.siten=this.commentData.siten
      //console.log(this.syubetu)
    }
    if(this.busyo==''){
      this.busyo=this.commentData.busyo
      //console.log(this.syubetu)
    }

    if(this.naiyou==''){
      this.naiyou=this.commentData.naiyou
      //console.log(this.syubetu)
    }
    const Info = {
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      naiyou:this.naiyou,
      updateAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.value = this.af.database.object('CommentData/' + this.uid + '/'+this.commentData.key);
    this.value.update(Info).then(data=>{

      this.editCommentTime();
    }).catch(error=>{
    })
  }else{

  this.OnOff=true;

}
  }
  editCommentTime() {////クレーム情報に対応した対応や対策のデータが編集されたときタイムをアップする
//console.log('ここ')
    //  console.log(this.claimitem)
    this.claimList = this.insideService.claimList;
    //   console.log(this.claimList)
    for (let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {

        const claimInfo = {
          commentUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo = this.af.database.object('ClaimData/' + this.uid + '/' + this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data => {
          this.modalRef.hide()
        }).catch(error => {

        })


      }
    }

  }
}
