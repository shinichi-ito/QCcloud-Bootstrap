import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import * as firebase from 'firebase'
import {OauthInfoService} from "../../oauth-info.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideService} from "../../Inside.service";
@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() password;//親コンポーネントから受取る属性
pass:string;
  uid:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;


  constructor(private af : AngularFire,private insideService:InsideService) {

  }

  ngOnInit() {

  }
  openDialog() {
    this.modalRef.show();
  }

  delete(){

   // console.log(this.password)
if(this.password.password==this.pass){
//console.log("一致")
   let storage = firebase.storage();
    let storageRef = storage.ref();
    let desertRef = storageRef.child('FileData/'+this.password.uid+'/'+this.password.filename);
    desertRef.delete().then(()=> {
     this.minusImageSu(this.password.uid)

   }).catch((error)=> {

   });




}else{
this.OnOff=true;

}




  }
   minusImageSu(uid:string){//クレーム情報の対応数をマイナス
     this.claimitem=this.insideService.claimitem;
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
     //  console.log(this.claimList[key].file)

       let su:number;
       su=this.claimList[key].file-1;
         if(su<0){
           su=0;
         }
         const claimInfo = {
          file:su,
          updateAt: firebase.database.ServerValue.TIMESTAMP
         };
         this.claimInfo=this.af.database.object('ClaimData/'+uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

         })
       }
     }
   }

}
