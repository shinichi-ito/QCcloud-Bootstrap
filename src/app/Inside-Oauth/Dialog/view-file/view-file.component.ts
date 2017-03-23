import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {OauthInfoService} from "../../oauth-info.service";
import {ImageDeleteDialogComponent} from "../delete-dialog/image-delete-dialog/image-delete-dialog.component";
import {ImageDialogComponent} from "../edit-dialog/image-dialog/image-dialog.component";
import {InsideMainService} from "../../inside-main.service";
import {InsideService} from "../../Inside.service";
import {SameImageComponent} from "../same-image/same-image.component";
import {NoFileListComponent} from "../no-file-list/no-file-list.component";

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
  @ViewChild("noFileListDialog") noFileListComponent: NoFileListComponent;
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
  newfileData:any[]=[];
  constructor(private insideService:InsideService,private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    this.syubetus = [
      {value: '0', label: '応急対応関連'},
      {value: '1', label: '恒久対策関連'},
      {value: '2', label: '原因分析関連'},
      {value: '3', label: '効果確認関連'},
      {value: '4', label: '情報関連'},
      {value: '5', label: 'すべて'},
    ];


  }
  setChange(value){
    if(value=='応急対応関連'){
      ///////////////////////////
      this.newfileData=this.insideMainService.fileData
      let jyoukyouData:any[]=[];
      for(let key in this.newfileData) {
        if (this.newfileData[key].doko == '応急対応') {
          this.typeData = this.newfileData[key].type;
          if (this.typeData.match(/^image\/(png|jpeg|gif)$/)) {
            this.newfileData[key]["downloadURL2"] = this.newfileData[key].downloadURL;
          } else if (this.typeData.match('application/pdf')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/pdf.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oexcel.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oword.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Excel.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Word.png';
          } else {

            return
          }
          jyoukyouData.push(this.newfileData[key])
        }
      }
      this.fileData=jyoukyouData
      ///////////////////////////
    }else if(value=='恒久対策関連'){
      ///////////////////////////
      this.newfileData=this.insideMainService.fileData
      let jyoukyouData:any[]=[];
      for(let key in this.newfileData) {
        if (this.newfileData[key].doko == '恒久対策') {
          this.typeData = this.newfileData[key].type;
          if (this.typeData.match(/^image\/(png|jpeg|gif)$/)) {
            this.newfileData[key]["downloadURL2"] = this.newfileData[key].downloadURL;
          } else if (this.typeData.match('application/pdf')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/pdf.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oexcel.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oword.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Excel.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Word.png';
          } else {

            return
          }
          jyoukyouData.push(this.newfileData[key])
        }
      }
      this.fileData=jyoukyouData
      ///////////////////////////

    }else if(value=='原因分析関連'){
      ///////////////////////////
      this.newfileData=this.insideMainService.fileData
      let jyoukyouData:any[]=[];
      for(let key in this.newfileData) {
        if (this.newfileData[key].doko == '原因分析') {
          this.typeData = this.newfileData[key].type;
          if (this.typeData.match(/^image\/(png|jpeg|gif)$/)) {
            this.newfileData[key]["downloadURL2"] = this.newfileData[key].downloadURL;
          } else if (this.typeData.match('application/pdf')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/pdf.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oexcel.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oword.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Excel.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Word.png';
          } else {

            return
          }
          jyoukyouData.push(this.newfileData[key])
        }
      }
      this.fileData=jyoukyouData
      ///////////////////////////

    }else if(value=='効果確認関連'){
      ///////////////////////////
      this.newfileData=this.insideMainService.fileData
      let jyoukyouData:any[]=[];
      for(let key in this.newfileData) {
        if (this.newfileData[key].doko == '効果確認') {
          this.typeData = this.newfileData[key].type;
          if (this.typeData.match(/^image\/(png|jpeg|gif)$/)) {
            this.newfileData[key]["downloadURL2"] = this.newfileData[key].downloadURL;
          } else if (this.typeData.match('application/pdf')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/pdf.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oexcel.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oword.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Excel.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Word.png';
          } else {

            return
          }
          jyoukyouData.push(this.newfileData[key])
        }
      }
      this.fileData=jyoukyouData
      ///////////////////////////

    }else if(value=='情報関連'){
      ///////////////////////////
      this.newfileData=this.insideMainService.fileData
      let jyoukyouData:any[]=[];
      for(let key in this.newfileData) {
        if (this.newfileData[key].doko == '元情報') {
          this.typeData = this.newfileData[key].type;
          if (this.typeData.match(/^image\/(png|jpeg|gif)$/)) {
            this.newfileData[key]["downloadURL2"] = this.newfileData[key].downloadURL;
          } else if (this.typeData.match('application/pdf')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/pdf.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oexcel.png';
          } else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Oword.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Excel.png';
          } else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            this.newfileData[key]["downloadURL2"] = 'assets/img/Word.png';
          } else {

            return
          }
          jyoukyouData.push(this.newfileData[key])
        }
      }
      this.fileData=jyoukyouData
      ///////////////////////////

    }




    else if(value=='すべて'){
this.fileData=this.insideMainService.fileData

    }




  }


  getFilterFile(itemData){
    let count=0;
    this.fileSameList=[];
    let fileSameList:any[]=[];
    let array = itemData.imageAnalysis;
    let newLine:any[]=[];
this.newData=[]
 fileSameList=this.insideService.fileList;
//console.log(array)
    for(let key in array) {
      for (let key2 in fileSameList) {
      //  console.log(array[key])
      //  console.log(fileSameList[key2].imageAnalysis)
        if (typeof fileSameList[key2].imageAnalysis === "undefined") {//undefind 判定は　エクセルデータ等が登録されているとimageAnalysisがないから

        }else{
          if (fileSameList[key2].imageAnalysis.indexOf(array[key]) >= 0) {
          this.newData.push(fileSameList[key2]);
          }
        }

       }
    }
//     // 重複削除
   let bb = this.newData.filter((x, i, self) => self.indexOf(x) === i);
    this.fileSameList=bb;
    for(let key in this.fileSameList){
      count=count+this.fileSameList[key].size;

    }
//console.log(count)

    if(bb.length===0){
      this.noFileListComponent.openDialog();
      this.modalRef.hide()
    }else{


      this.insideMainService.onDataUpSuMain(this.uid,count/1024/1024);//画像を取得する際そのMBを合計してその月にどれくらいダウンロードしてるか加算
      this.sameImageComponent.openDialog();
      this.modalRef.hide()

    }






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
