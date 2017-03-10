import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {OauthInfoService} from "../../oauth-info.service";
import {ImageDeleteDialogComponent} from "../delete-dialog/image-delete-dialog/image-delete-dialog.component";
import {ImageDialogComponent} from "../edit-dialog/image-dialog/image-dialog.component";
import {InsideMainService} from "../../inside-main.service";
import {InsideService} from "../../Inside.service";
import {SameImageComponent} from "../same-image/same-image.component";

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  @ViewChild("imageDeleteDialog") imageDeleteDialogComponent: ImageDeleteDialogComponent;
  @ViewChild("imageEditDialog") imageEditDialogComponent: ImageDialogComponent;
  @ViewChild("imageSameDialog") sameImageComponent: SameImageComponent;
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() fileData;//親コンポーネントから受取る属性
  @Input() onoffData;//親コンポーネントから受取る属性
  @Input() passwordData;//親コンポーネントから受取る属性
  password:any[]=[];
  password2:any[]=[];
  uid:string;
  syubetus:Array<any>;
  typeData:any;
  fileList:any;
  newData:any[]=[];
  fileSameList:any[]=[];
  constructor(private insideService:InsideService,private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    this.syubetus = [
      {value: '0', label: '対応関連'},
      {value: '1', label: '対策関連'},
      {value: '2', label: '原因分析関連'},
      {value: '3', label: '効果確認関連'},
      {value: '4', label: '情報関連'},
      {value: '5', label: 'すべて'},
    ];


  }



  getFilterFile(itemData){
    this.fileSameList=[];
    let fileSameList:any[]=[];
    let array = itemData.imageAnalysis;
    let newLine:any[]=[];
this.newData=[]
 fileSameList=this.insideService.fileList;
    for(let key in array) {
      for (let key2 in fileSameList) {
        if (fileSameList[key2].imageAnalysis.indexOf(array[key]) >= 0) {
          this.newData.push(fileSameList[key2]);
        }
      }
    }
    // 重複削除
    let bb = this.newData.filter((x, i, self) => self.indexOf(x) === i);
    this.fileSameList=bb;
this.sameImageComponent.openDialog();
 this.modalRef.hide()
  }

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
