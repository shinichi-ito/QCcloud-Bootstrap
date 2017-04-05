import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";
import {ViewFileOtherComponent} from "../../../Dialog/view-file-other/view-file-other.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideMainService} from "../../../inside-main.service";
import {ViewSyousaiComponent} from "../../../Dialog/view-syousai/view-syousai.component";
import {NoFileListComponent} from "../../../Dialog/no-file-list/no-file-list.component";
import {TaisakuViewDialogComponent} from "../../../Dialog/taisaku-view-dialog/taisaku-view-dialog.component";

@Component({
  selector: 'app-file-list-all',
  templateUrl: './file-list-all.component.html',
  styleUrls: ['./file-list-all.component.css']
})
export class FileListAllComponent implements OnInit {
  @ViewChild("fileOtherDialog") viewFileOtherComponent: ViewFileOtherComponent;
fileList:any[]=[];
claimList:any[]=[];
data:any;
  fileData:any;
  typeData:any;
  onoffData:boolean;
  uid:string;
  @ViewChild("syousaiDialog") viewSyousaiComponent: ViewSyousaiComponent;
  @ViewChild("fileDialog") viewFileComponent: ViewFileComponent;
  @ViewChild("taisakuviewDialog") taisakuViewDialogComponent: TaisakuViewDialogComponent;
  claimItem:any;
taisakuData:any;
  // taisakuList:any[]=[];
  // geninList:any[]=[];
  // koukaList:any[]=[];

  constructor(private oauthInfoService:OauthInfoService,private insideService:InsideService,private insideMainService:InsideMainService) {
    this.data=this.insideService.fileList;
this.uid=this.oauthInfoService.uid;
    this.claimList=this.insideService.claimList;
  }

  ngOnInit() {
  }

  setMoto(item){
    let claimItem;
    for(let key in this.claimList){
      if(item.claimkey==this.claimList[key].key){
        //   console.log(item.claimkey)
        //   console.log(this.claimList[key])
        claimItem=this.claimList[key];
      }
    }
    this.claimItem=claimItem;
    this.viewSyousaiComponent.openDialog();

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

  setMotoTaisaku(item){
  //  console.log(item.doko)
    let kakusyuList:any;
    let kakusyuData:any;
    if(item.doko=='応急対応'){
      kakusyuList=this.insideService.taiouList
      for(let key in kakusyuList){
        if(item.jyoukyoukey==kakusyuList[key].key){
          // console.log(kakusyuList[key])
          kakusyuData=kakusyuList[key]
        }
      }
      this.taisakuData=kakusyuData;
      this.taisakuViewDialogComponent.openDialog();


    }else  if(item.doko=='恒久対策'){
      kakusyuList=this.insideService.taisakuList
      for(let key in kakusyuList){
        if(item.jyoukyoukey==kakusyuList[key].key){
          // console.log(kakusyuList[key])
          kakusyuData=kakusyuList[key]
        }
      }
      this.taisakuData=kakusyuData;
      this.taisakuViewDialogComponent.openDialog();

    }else  if(item.doko=='効果確認'){
      kakusyuList=this.insideService.koukaList
      for(let key in kakusyuList){
        if(item.jyoukyoukey==kakusyuList[key].key){
          // console.log(kakusyuList[key])
          kakusyuData=kakusyuList[key]
        }
      }
      this.taisakuData=kakusyuData;
      this.taisakuViewDialogComponent.openDialog();

    }else  if(item.doko=='原因分析'){
      kakusyuList=this.insideService.geninList
      for(let key in kakusyuList){
        if(item.jyoukyoukey==kakusyuList[key].key){
          // console.log(kakusyuList[key])
          kakusyuData=kakusyuList[key]
        }
      }
      this.taisakuData=kakusyuData;
      this.taisakuViewDialogComponent.openDialog();

    }else  if(item.doko=='元情報'){
//console.log('ここ')

      let claimItem;
      for(let key in this.claimList){
        if(item.claimkey==this.claimList[key].key){
          //   console.log(item.claimkey)
          //   console.log(this.claimList[key])
          claimItem=this.claimList[key];
        }
      }
      this.claimItem=claimItem;
      this.viewSyousaiComponent.openDialog();




    }




  }


}
