import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideMainService} from "../../../inside-main.service";
@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
uid:string;
  urlData:string;
  OrderID:string;
  companyname:string;
  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;

    this.insideMainService.getCompanyInfo(this.uid).subscribe((data)=>{
        for(let key in data){
          if(data[key].$key=='OrderID'){
            this.OrderID=data[key].$value;
          }
          if(data[key].$key=='companyname'){
            this.companyname=data[key].$value;
          }


        }//forを抜けた
      },
      (error)=>{

      });





    this.GmoURL();
  }

  ngOnInit() {
  }
  GmoURL(){


    //let url='http://localhost:8888/editcard?';//https://pt01.mul-pay.jp/link/tshop00027379/Multi/Entry
    let url=this.insideMainService.urledit;

    //let shopID='tshop00027379';//tshop00027379
    let shopID=this.insideMainService.shopID;

    let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');
    let uid=this.uid;
    let orderID=this.OrderID;

    //let siteID='tsite00024826';
    let siteID=this.insideMainService.siteID;


    let kainInfo=this.kainInfo(uid,date);
    let reURL=this.insideMainService.reURL2;

    // let canURL='http://localhost:8888/cancel';
    let canURL=this.insideMainService.canURL;



    let URL=url+'ShopID='+shopID+'&OrderID='+orderID
      +'&DateTime='+date+
      '&RetURL='+reURL+
      '&CancelURL='+canURL+'&SiteID='+siteID+'&MemberID='+uid+'&MemberName='+this.companyname+
      '&MemberPassString='+kainInfo;

    // console.log(URL)
    this.urlData=URL;
  }

  //サイト ID＝testsite   会員 ID＝300028   サイトパスワード＝abcdefgh   日時情報＝20080401092355
  // 会員情報チェック文字列＝「”testsite|300028|abcdefgh|20080401092355” をＭＤ５でハッシュした値」
  kainInfo(uid:string,date:any){
   // let siteID='tsite00024826';//	tsite00024826
    let siteID=this.insideMainService.siteID;

    //let shopID='tshop00027379';
    let shopID=this.insideMainService.shopID;

    let kainID=uid;

  //  let sitepassword='6yh42aya';//6yh42aya
    let sitepassword=this.insideMainService.sitepassword;

   // let shoppassword='ncea14h4';
    let shoppassword=this.insideMainService.shoppassword;


//console.log(siteID+'|'+kainID+'|'+shopID+'|'
 // +this.OrderID+'|'+sitepassword+'|'+shoppassword+'|'+date);

    return Md5.hashStr(siteID+'|'+kainID+'|'+shopID+'|'
      +this.OrderID+'|'+sitepassword+'|'+shoppassword+'|'+date);

  }






//指定の日付フォーマットで表示
  formatDate(date, format) {//console.log(this.formatDate(new Date(),'YYYYMMDDhhmmss'));表示は20170324094029
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      var length = format.match(/S/g).length;
      for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
  };

}
