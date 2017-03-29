import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {OauthInfoService} from "../../../oauth-info.service";
@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
uid:string;
  urlData:string;
  constructor(private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;
    this.GmoURL();
  }

  ngOnInit() {
  }
  GmoURL(){


    let url='http://localhost:8888/editcard?';//https://pt01.mul-pay.jp/link/tshop00027379/Multi/Entry
    let shopID='tshop00027379';//tshop00027379
    let date=this.formatDate(new Date(),'YYYYMMDDhhmmss');
    let uid=this.uid;
    let orderID=uid.substr(0,27);
let siteID='tsite00024826';

    let kainInfo=this.kainInfo(uid,date);




    let URL=url+'ShopID='+shopID+'&OrderID='+orderID
      +'&DateTime='+date+
      '&RetURL=http://localhost:8888/successeditcard'+
      '&CancelURL=http://localhost:8888/cancel'+'&SiteID='+siteID+'&MemberID='+uid+
      '&MemberPassString='+kainInfo;

    // console.log(URL)
    this.urlData=URL;
  }

  //サイト ID＝testsite   会員 ID＝300028   サイトパスワード＝abcdefgh   日時情報＝20080401092355
  // 会員情報チェック文字列＝「”testsite|300028|abcdefgh|20080401092355” をＭＤ５でハッシュした値」
  kainInfo(uid:string,date:any){
    let siteID='tsite00024826';//	tsite00024826

    let shopID='tshop00027379';
    let kainID=uid;
    let sitepassword='6yh42aya';//6yh42aya
    let shoppassword='ncea14h4';

    return Md5.hashStr(siteID+'|'+kainID+'|'+shopID+'|'
      +date+'|'+sitepassword+'|'+shoppassword+'|'+date);

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
