import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {OauthInfoService} from "../../oauth-info.service";
import {ImageDeleteDialogComponent} from "../delete-dialog/image-delete-dialog/image-delete-dialog.component";
import {ImageDialogComponent} from "../edit-dialog/image-dialog/image-dialog.component";
import {InsideMainService} from "../../inside-main.service";
import {InsideService} from "../../Inside.service";

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  @ViewChild("imageDeleteDialog") imageDeleteDialogComponent: ImageDeleteDialogComponent;
  @ViewChild("imageEditDialog") imageEditDialogComponent: ImageDialogComponent;

  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() fileData;//親コンポーネントから受取る属性
  @Input() onoffData;//親コンポーネントから受取る属性
  @Input() passwordData;//親コンポーネントから受取る属性
  password:any[]=[];
  password2:any[]=[];
  uid:string;
  constructor(private insideService:InsideService,private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {}








  //ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }
  setPassword(idx){
    this.password['filename']=this.fileData[idx].filename;
    this.password['uid']=this.uid;
    this.password['password']=this.passwordData[0];
    this.password['key']=this.fileData[idx].key;
 this.imageDeleteDialogComponent.openDialog();
   this.modalRef.hide()
  }
  setEditPassword(idx){
    this.password2['uid']=this.uid;
    this.password2['password']=this.passwordData[0];
    this.password2['key']=this.fileData[idx].key;
    this.password2['toukousya']=this.fileData[idx].toukousya;
    this.password2['siten']=this.fileData[idx].siten;
    this.password2['busyo']=this.fileData[idx].busyo;
    this.password2['comment']=this.fileData[idx].comment;
  this.imageEditDialogComponent.openDialog();
    this.modalRef.hide()
  }

}
