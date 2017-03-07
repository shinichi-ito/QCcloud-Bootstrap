import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideMainService} from "../../../inside-main.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() password2;//親コンポーネントから受取る属性
  comment:string='';
  toukousya:string='';
  siten:string='';
  busyo:string='';
  uid:string;
  key:string;
  value: FirebaseObjectObservable<any>;
  OnOff:boolean=false;
  pass:string;
  constructor(private insideMainService:InsideMainService,private af : AngularFire) {

  }

  ngOnInit() {}

  openDialog() {
    this.modalRef.show();
  }

  onEdit(){

    if(this.toukousya==''){
      this.toukousya=this.password2.toukousya;

    }
    if(this.siten==''){
      this.siten=this.password2.siten;
      //   // console.log(this.siten)
    }
    if(this.busyo==''){
      this.busyo=this.password2.busyo;
      //   //console.log(this.busyo)
    }
    //
    if(this.comment==''){
      this.comment=this.password2.comment;
      //   //console.log(this.syubetu)
    }


    if(this.password2.password==this.pass){
      // console.log(this.password2.key)
      this.insideMainService.jyoukyoukey=this.password2.key;//削除するFileDataのキーを別に保管して　画像一覧の表示をオぶサーバ使って削除
      // console.log( this.insideMainService.jyoukyoukey)
this.insideMainService.fileDataUp(this.toukousya,this.siten,this.busyo,this.comment,this.password2.uid,this.password2.key)
//       const Info = {
//         toukousya:this.toukousya,
//         siten:this.siten,
//         busyo:this.busyo,
//         comment:this.comment,
//         updateAt: firebase.database.ServerValue.TIMESTAMP,
//       };
//       this.value = this.af.database.object('FileData/' + this.password2.uid + '/'+this.password2.key);
//       this.value.update(Info).then(data=>{
// this.insideMainService.imageData=data;
         this.modalRef.hide()
//       }).catch(error=>{
//       })
    }else{
      this.OnOff=true;
    }
  }



}
