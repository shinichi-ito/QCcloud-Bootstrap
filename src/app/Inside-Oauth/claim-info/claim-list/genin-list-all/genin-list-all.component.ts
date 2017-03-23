import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {ViewSyousaiComponent} from "../../../Dialog/view-syousai/view-syousai.component";
import {NoFileListComponent} from "../../../Dialog/no-file-list/no-file-list.component";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";
import {InsideMainService} from "../../../inside-main.service";
import {OauthInfoService} from "../../../oauth-info.service";

@Component({
  selector: 'app-genin-list-all',
  templateUrl: './genin-list-all.component.html',
  styleUrls: ['./genin-list-all.component.css']
})
export class GeninListAllComponent implements OnInit {
  geninList:any[]=[];
  claimList:any[]=[];
  fileList:any[]=[];
  newfileList:any[]=[];
  claimItem:any;
  typeData:any;
  passwordData:any[]=[];
  onoffData:boolean;
  fileData:any[]=[];
  uid:string;
  @ViewChild("syousaiDialog") viewSyousaiComponent: ViewSyousaiComponent;
  @ViewChild("noFileListDialog") noFileListComponent: NoFileListComponent;
  @ViewChild("fileDialog") viewFileComponent: ViewFileComponent;
  data:any[]=[];
  public filterQuery = "";
  public rowsOnPage = 10;



  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.claimList=this.insideService.claimList;
    this.fileList=this.insideService.fileList;
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
    //this.geninList=this.insideService.geninList
    this.data=this.insideService.geninList
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


  getFile(item){
    this.fileList=[];
    this.newfileList=[];
    let count=0;
    this.fileList=this.insideService.fileList;//再度開きなおしたときFileDataを最新のものを取得したい
    for(let key in this.fileList){


      //  console.log(this.fileList[key].doko)
      if(item.claimkey==this.fileList[key].claimkey&&this.fileList[key].doko=='応急対応'){
        this.newfileList.push(this.fileList[key])
      }
    }
    // this.index=index;
    // this.taiouData=this.newtaiouList[index];
    // this.insideService.shareData=this.taiouData;//shareDataは対応や対策で表示されている一覧が入っている
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==item.key){//jyoukyoukeyとはそのファイルがどの対応や対策に紐づいてるかの対応や対策のキー
        count=count+this.newfileList[key].size;

        this.typeData=this.newfileList[key].type;
        if (this.typeData.match(/^image\/(png|jpeg|gif)$/)){
          this.newfileList[key]["downloadURL2"] = this.newfileList[key].downloadURL;
        }else  if (this.typeData.match('application/pdf')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/pdf.png';

        }else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Oexcel.png';
        }else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Oword.png';
        }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Excel.png';
        }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Word.png';
        } else {

          return
        }
        jyoukyouData.push(this.newfileList[key]);
        // passwordData.push(this.taiouData.password)
      }
    }
    // console.log(jyoukyouData)
    // console.log(jyoukyouData.length)
    if(jyoukyouData.length===0){
      this.noFileListComponent.openDialog();
    }else{
      this.fileData=jyoukyouData;
      //  this.onoffData=true;
      //   this.passwordData=passwordData;
      this.viewFileComponent.openDialog();
    }



    if(count===0){
      console.log('ない')
    }else{
      console.log('ある')

      //console.log(count/1024/1024+this.oauthInfoService.dataup)
      this.insideMainService.onDataUpSuMain(this.uid,count/1024/1024)//画像を取得する際そのMBを合計してその月にどれくらいダウンロードしてるか加算
    }

  }

}
