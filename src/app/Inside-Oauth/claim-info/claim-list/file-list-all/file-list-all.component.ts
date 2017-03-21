import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";
import {ViewFileOtherComponent} from "../../../Dialog/view-file-other/view-file-other.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideMainService} from "../../../inside-main.service";

@Component({
  selector: 'app-file-list-all',
  templateUrl: './file-list-all.component.html',
  styleUrls: ['./file-list-all.component.css']
})
export class FileListAllComponent implements OnInit {
  @ViewChild("fileOtherDialog") viewFileOtherComponent: ViewFileOtherComponent;
fileList:any[]=[];
data:any;
  fileData:any;
  typeData:any;
  onoffData:boolean;
  uid:string;
  constructor(private oauthInfoService:OauthInfoService,private insideService:InsideService,private insideMainService:InsideMainService) {
    this.data=this.insideService.fileList;
this.uid=this.oauthInfoService.uid;

  }

  ngOnInit() {
  }
  setFile(item){
    this.getFile(item);
//  this.viewFileComponent.openDialog();



  }

  getFile(item){

        this.typeData=item.type;
        if (this.typeData.match(/^image\/(png|jpeg|gif)$/)){
          this.fileData=item.downloadURL;

        }else  if (this.typeData.match('application/pdf')) {
          this.fileData = 'assets/img/pdf.png';

        }else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
          this.fileData= 'assets/img/Oexcel.png';

        }else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
          this.fileData = 'assets/img/Oword.png';

        }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
          this.fileData = 'assets/img/Excel.png';

        }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          this.fileData = 'assets/img/Word.png';

        } else {

          return
        }

      this.viewFileOtherComponent.openDialog();

   this.insideMainService.onDataUpSuMain(this.uid,item.size/1024/1024)//画像を取得する際そのMBを合計してその月にどれくらいダウンロードしてるか加算
  }
}
